import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { DOCUMENT_TEMPLATES, DocumentType } from '@/../../shared/documentTypes';
import { DocumentForm } from '@/components/DocumentForm';
import { DocumentSelector } from '@/components/DocumentSelector';
import { DocumentPreview } from '@/components/DocumentPreview';
import { toast } from 'sonner';

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>('declaracao');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [editedDocument, setEditedDocument] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const template = DOCUMENT_TEMPLATES[selectedDoc];

  const generatedDocument = useMemo(() => {
    if (editMode && editedDocument) {
      return editedDocument;
    }
    return template.template(formData);
  }, [template, formData, editMode, editedDocument]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    setEditMode(false);
    
    // Scroll to preview on mobile
    if (window.innerWidth < 1024 && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleDocumentChange = (docType: DocumentType) => {
    setSelectedDoc(docType);
    setFormData({});
    setEditMode(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDocument);
    toast.success('Documento copiado para a área de transferência!');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>${template.title}</title>
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
            <pre>${generatedDocument}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generatedDocument));
    element.setAttribute('download', `${template.id}-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Documento baixado com sucesso!');
  };

  // Group templates by category
  const groupedTemplates = useMemo(() => {
    const groups: Record<string, typeof DOCUMENT_TEMPLATES[DocumentType][]> = {};
    Object.values(DOCUMENT_TEMPLATES).forEach(doc => {
      if (!groups[doc.category]) {
        groups[doc.category] = [];
      }
      groups[doc.category].push(doc);
    });
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Escritor Profissional</h1>
            <p className="text-sm text-muted-foreground">Documentos formais em segundos</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <Card className="p-6 border border-border sticky top-24">
              <h2 className="text-lg font-bold mb-4 text-foreground">Documentos</h2>
              <DocumentSelector
                selectedDoc={selectedDoc}
                onSelect={(docType) => {
                  handleDocumentChange(docType);
                  setSidebarOpen(false);
                }}
                groupedTemplates={groupedTemplates}
              />
            </Card>
          </div>

          {/* Right Column - Form and Preview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form Section */}
            <Card className="p-6 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">{template.title}</h2>
              <p className="text-sm text-muted-foreground mb-6">{template.description}</p>
              <DocumentForm
                template={template}
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            </Card>

            {/* Preview Section */}
            <div ref={previewRef} className="scroll-mt-24">
              <Card className="p-6 border border-border">
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
          <p className="mt-2">Todos os documentos são gerados localmente no seu navegador. Nenhum dado é armazenado.</p>
        </div>
      </footer>
    </div>
  );
}
