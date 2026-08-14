import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LogoUploaderProps {
  logoDataUrl: string;
  onLogoChange: (dataUrl: string) => void;
  onRemove: () => void;
}

const MAX_LOGO_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];

export function LogoUploader({ logoDataUrl, onLogoChange, onRemove }: LogoUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Escolha um logotipo em PNG ou JPEG.');
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      toast.error('O logotipo deve ter no máximo 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLogoChange(reader.result);
        toast.success('Logotipo adicionado ao documento.');
      }
    };
    reader.onerror = () => toast.error('Não foi possível ler o logotipo.');
    reader.readAsDataURL(file);
  };

  return (
    <section className="mb-4 rounded-lg border border-[#e8edf5] bg-[#f8fbff] p-3" aria-labelledby="logo-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ImagePlus size={16} className="text-primary" />
            <h3 id="logo-title" className="text-xs font-semibold text-foreground">Logotipo da empresa</h3>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">PNG ou JPEG, até 2 MB. O arquivo fica apenas neste navegador.</p>
        </div>
        {logoDataUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-destructive"
            title="Remover logotipo"
          >
            <Trash2 size={14} />
            Remover
          </Button>
        )}
      </div>

      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <Upload size={14} />
          <span>{logoDataUrl ? 'Trocar logotipo' : 'Adicionar logotipo'}</span>
        </div>
        <input
          id="company-logo"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
        />

        {logoDataUrl ? (
          <div className="flex h-16 w-40 items-center justify-center rounded-md border border-border bg-white p-1 shadow-sm">
            <img src={logoDataUrl} alt="Prévia do logotipo da empresa" className="max-h-full max-w-full object-contain" />
          </div>
        ) : (
          <span className="text-[11px] text-muted-foreground">Aparecerá no cabeçalho da folha A4.</span>
        )}
      </div>
    </section>
  );
}
