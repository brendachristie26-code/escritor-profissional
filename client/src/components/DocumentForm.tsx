import { DocumentTemplate } from '@/../../shared/documentTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MaskedInput } from '@/components/MaskedInput';
import { CheckCircle2, Circle } from 'lucide-react';

interface DocumentFormProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
}

export function DocumentForm({ template, formData, onFieldChange }: DocumentFormProps) {
  const requiredFields = template.fields.filter(f => f.required);
  const filledRequiredFields = requiredFields.filter(f => formData[f.id]?.trim()).length;
  const completionPercentage = Math.round((filledRequiredFields / requiredFields.length) * 100);

  // Separar campos por tipo para melhor layout
  const textareaFields = template.fields.filter(f => f.type === 'textarea');
  const otherFields = template.fields.filter(f => f.type !== 'textarea');

  return (
    <div className="space-y-6">
      {/* Progress Bar - Destacada */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-foreground">Progresso do Formulário</span>
          <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden shadow-sm">
          <div
            className="bg-gradient-to-r from-primary to-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-blue-700 mt-2 font-medium">
          {filledRequiredFields} de {requiredFields.length} campos obrigatórios preenchidos
        </p>
      </div>

      {/* Campos em 2 Colunas */}
      <div className="space-y-6">
        {/* Renderizar campos não-textarea em 2 colunas */}
        {otherFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherFields.map(field => {
              const isFilled = formData[field.id]?.trim() ? true : false;
              const isRequired = field.required;

              return (
                <div key={field.id} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor={field.id} className="text-sm font-semibold flex-1">
                      {field.label}
                    </Label>
                    {isRequired && (
                      isFilled ? (
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle size={16} className="text-destructive flex-shrink-0" />
                      )
                    )}
                  </div>

                  {field.type === 'select' && field.options ? (
                    <Select value={formData[field.id] || ''} onValueChange={(value) => onFieldChange(field.id, value)}>
                      <SelectTrigger className={`${isRequired && !isFilled ? 'border-destructive/50 bg-red-50/30' : ''}`}>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : ['cpf', 'cnpj', 'phone'].includes(field.type) ? (
                    <MaskedInput
                      id={field.id}
                      type={field.type as 'cpf' | 'cnpj' | 'phone'}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(value) => onFieldChange(field.id, value)}
                      className={`${isRequired && !isFilled ? 'border-destructive/50 bg-red-50/30' : ''}`}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => onFieldChange(field.id, e.target.value)}
                      maxLength={field.maxLength}
                      className={`${isRequired && !isFilled ? 'border-destructive/50 bg-red-50/30' : ''}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Campos Textarea - Largura Completa */}
        {textareaFields.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-border">
            {textareaFields.map(field => {
              const isFilled = formData[field.id]?.trim() ? true : false;
              const isRequired = field.required;

              return (
                <div key={field.id}>
                  <div className="flex items-start gap-2 mb-2">
                    <Label htmlFor={field.id} className="text-sm font-semibold flex-1 pt-1">
                      {field.label}
                    </Label>
                    {isRequired && (
                      isFilled ? (
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <Circle size={16} className="text-destructive flex-shrink-0 mt-1" />
                      )
                    )}
                  </div>
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    className={`min-h-32 resize-none ${isRequired && !isFilled ? 'border-destructive/50 bg-red-50/30' : ''}`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
