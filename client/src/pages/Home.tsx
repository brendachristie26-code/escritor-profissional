import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentForm } from '@/components/DocumentForm';
import { DocumentPreview } from '@/components/DocumentPreview';
import { DocumentSelector } from '@/components/DocumentSelector';
import { DOCUMENT_TEMPLATES } from '@/../../shared/documentTypes';
import { getExampleData } from '@/../../shared/exampleData';

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<any>('declaracao');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [editedDocument, setEditedDocument] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const template = (DOCUMENT_TEMPLATES as any)[selectedDoc] || Object.values(DOCUMENT_TEMPLATES)[0];

  // Agrupar templates por categoria
  const groupedTemplates = Object.values(DOCUMENT_TEMPLATES).reduce((acc: Record<string, any[]>, tmpl: any) => {
    const category = tmpl.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tmpl);
    return acc;
  }, {});

  const handleDocumentChange = (docType: any) => {
    setSelectedDoc(docType as any);
    setFormData({});
    setEditMode(false);
    setEditedDocument('');
  };

  // Restaurar o último documento e os dados salvos no navegador.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('escritor-profissional-form');
      if (saved) {
        const parsed = JSON.parse(saved) as { selectedDoc?: string; formData?: Record<string, string> };
        if (parsed.selectedDoc && (DOCUMENT_TEMPLATES as any)[parsed.selectedDoc]) {
          setSelectedDoc(parsed.selectedDoc);
        }
        if (parsed.formData && typeof parsed.formData === 'object') {
          setFormData(parsed.formData);
        }
      }
    } catch (error) {
      console.warn('Não foi possível restaurar o formulário salvo.', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Salvar automaticamente o documento atual sem enviar dados para nenhum servidor.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        'escritor-profissional-form',
        JSON.stringify({ selectedDoc, formData }),
      );
    } catch (error) {
      console.warn('Não foi possível salvar o formulário no navegador.', error);
    }
  }, [selectedDoc, formData, isHydrated]);

  // Ocultar o aviso automaticamente depois de alguns segundos.
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleLoadExample = () => {
    setFormData(getExampleData(selectedDoc as any));
    setEditMode(false);
    setEditedDocument('');
    setNotice('Exemplo carregado. Você pode editar qualquer campo antes de copiar ou baixar.');
  };

  const handleClearForm = () => {
    setFormData({});
    setEditMode(false);
    setEditedDocument('');
    setNotice('Formulário limpo. Seus dados foram removidos desta sessão.');
  };

  // Evitar mostrar valores indefinidos enquanto o formulário está vazio.
  const hasFormData = Object.values(formData).some(value => value?.trim());
  const generatedDocument = hasFormData ? (template as any).template(formData) : '';

  // Auto-scroll para preview quando documento é gerado
  useEffect(() => {
    if (generatedDocument && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [generatedDocument]);

  return (
    <div className="min-h-screen bg-background">
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-20 z-[60] max-w-sm rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-800 shadow-lg"
        >
          {notice}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Escritor Profissional</h1>
            <p className="text-sm text-muted-foreground">Documentos formais em segundos</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Left Column - Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <Card className="p-4 border border-border sticky top-24">
              <h2 className="text-lg font-bold mb-4 text-foreground">Documentos</h2>
              <DocumentSelector
                selectedDoc={selectedDoc as any}
                onSelect={(docType: any) => {
                  handleDocumentChange(docType as any);
                  setSidebarOpen(false);
                }}
                groupedTemplates={groupedTemplates}
              />
            </Card>
          </div>

          {/* Center Column - Form */}
          <div className="lg:col-span-2">
            {/* Form Section */}
            <Card className="p-4 border border-[#f0f0f0] shadow-[0_10px_30px_rgba(0,0,0,0.02)] h-fit sticky top-24">
              <h2 className="text-lg font-bold mb-2 text-foreground">{template.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
              <DocumentForm
                template={template as any}
                formData={formData}
                onFieldChange={handleFieldChange}
                onLoadExample={handleLoadExample}
                onClearForm={handleClearForm}
              />
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div ref={previewRef} className="scroll-mt-24">
              <Card className="p-4 border border-[#f0f0f0] shadow-[0_10px_30px_rgba(0,0,0,0.02)] h-fit sticky top-24">
                <DocumentPreview
                  document={generatedDocument}
                  title={template.title}
                  editMode={editMode}
                  onEditModeChange={setEditMode}
                  editedDocument={editedDocument}
                  onEditedDocumentChange={setEditedDocument}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Escritor Profissional © 2026 - Gerador de Documentos Formais</p>
          <p className="mt-2">Todos os documentos são gerados localmente. Seu progresso fica salvo apenas neste navegador.</p>
        </div>
      </footer>
    </div>
  );
}
