import { Copy, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generatePDF } from '@/lib/pdfGenerator';

interface DocumentPreviewProps {
  document: string;
  title: string;
  editMode: boolean;
  onEditModeChange: (mode: boolean) => void;
  editedDocument: string;
  onEditedDocumentChange: (doc: string) => void;
}

export function DocumentPreview({
  document,
  title,
  editMode,
  onEditModeChange,
  editedDocument,
  onEditedDocumentChange,
}: DocumentPreviewProps) {
  const displayDocument = editMode && editedDocument ? editedDocument : document;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayDocument);
    toast.success('Documento copiado para a área de transferência!');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800') as Window | null;
    if (printWindow) {
      const doc = printWindow.document;
      doc.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>${title}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Georgia', serif; 
                line-height: 1.8; 
                margin: 40px; 
                color: #1a1a1a;
                background: white;
              }
              h1 { font-family: 'Georgia', serif; margin-bottom: 30px; font-size: 24px; }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word;
                font-family: 'Georgia', serif;
                line-height: 1.8;
              }
              @media print {
                body { margin: 20px; }
              }
            </style>
          </head>
          <body>
            <pre>${displayDocument}</pre>
          </body>
        </html>
      `);
      doc.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const handleDownload = () => {
    try {
      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().getTime()}`;
      generatePDF(displayDocument, filename);
      toast.success('PDF baixado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar PDF');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Visualização</h2>
        <button
          onClick={() => onEditModeChange(!editMode)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            editMode
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          {editMode ? '✓ Salvar' : '✎ Editar'}
        </button>
      </div>

      {editMode ? (
        <textarea
          value={displayDocument}
          onChange={(e) => onEditedDocumentChange(e.target.value)}
          className="w-full min-h-96 p-4 font-mono text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      ) : (
        /* Estilo Folha A4 Premium */
        <div className="bg-gray-100 p-8 rounded-lg min-h-96 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl p-12 rounded-lg shadow-lg border border-gray-200">
            <div className="whitespace-pre-wrap text-sm leading-relaxed font-serif text-foreground overflow-y-auto max-h-96">
              {displayDocument}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 hover:bg-primary hover:text-primary-foreground transition-all"
          title="Copiar texto do documento para a área de transferência"
        >
          <Copy size={18} />
          <span className="hidden sm:inline">Copiar Texto</span>
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 hover:bg-primary hover:text-primary-foreground transition-all"
          title="Imprimir documento"
        >
          <Printer size={18} />
          <span className="hidden sm:inline">Imprimir</span>
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 hover:bg-primary hover:text-primary-foreground transition-all"
          title="Baixar documento como arquivo PDF"
        >
          <Download size={18} />
          <span className="hidden sm:inline">PDF</span>
        </Button>
      </div>
    </div>
  );
}
