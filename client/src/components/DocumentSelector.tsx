import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { DOCUMENT_TEMPLATES, DocumentType } from '@/../../shared/documentTypes';
import { Search } from 'lucide-react';

interface DocumentSelectorProps {
  selectedDoc: DocumentType;
  onSelect: (docType: DocumentType) => void;
  groupedTemplates: Record<string, typeof DOCUMENT_TEMPLATES[DocumentType][]>;
}

export function DocumentSelector({ selectedDoc, onSelect, groupedTemplates }: DocumentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = useMemo(() => {
    if (!searchTerm.trim()) {
      return groupedTemplates;
    }

    const filtered: Record<string, typeof DOCUMENT_TEMPLATES[DocumentType][]> = {};
    const searchLower = searchTerm.toLowerCase();

    Object.entries(groupedTemplates).forEach(([category, docs]) => {
      const matchingDocs = docs.filter(
        doc =>
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description.toLowerCase().includes(searchLower)
      );

      if (matchingDocs.length > 0) {
        filtered[category] = matchingDocs;
      }
    });

    return filtered;
  }, [searchTerm, groupedTemplates]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
        <Input
          placeholder="Buscar documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {Object.entries(filteredTemplates).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Nenhum documento encontrado</p>
          </div>
        ) : (
          Object.entries(filteredTemplates).map(([category, docs]) => (
            <div key={category}>
              <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">{category}</p>
              <div className="space-y-2 ml-2">
                {docs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => onSelect(doc.id as DocumentType)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm ${
                      selectedDoc === doc.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-secondary text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium line-clamp-1">{doc.title}</div>
                    <div className="text-xs opacity-70 line-clamp-1">{doc.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
