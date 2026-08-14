import { DocumentTemplate } from '@/../../shared/documentTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MaskedInput } from '@/components/MaskedInput';

interface DocumentFormProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
  onLoadExample?: () => void;
  onClearForm?: () => void;
}

export function DocumentForm({ template, formData, onFieldChange, onLoadExample, onClearForm }: DocumentFormProps) {
  const requiredFields = template.fields.filter(f => f.required);
  const filledRequiredFields = requiredFields.filter(f => formData[f.id]?.trim()).length;
  const completionPercentage = Math.round((filledRequiredFields / requiredFields.length) * 100);

  // Separar campos por tipo
  const textareaFields = template.fields.filter(f => f.type === 'textarea');
  const otherFields = template.fields.filter(f => f.type !== 'textarea');

  return (
    <div className="space-y-6">
      {/* Progress Bar - Destacada com Premium Look */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-sm font-bold text-foreground">Progresso do Formulário</span>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
            {(onLoadExample || onClearForm) && (
              <div className="flex flex-wrap items-center justify-end gap-2">
                {onLoadExample && (
                  <button
                    type="button"
                    onClick={onLoadExample}
                    className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Carregar Exemplo
                  </button>
                )}
                {onClearForm && (
                  <button
                    type="button"
                    onClick={onClearForm}
                    className="rounded-md border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Limpar formulário
                  </button>
                )}
              </div>
            )}
          </div>
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

      {/* Campos em 3 Colunas */}
      <div className="space-y-6">
        {/* Renderizar campos não-textarea em 3 colunas */}
        {otherFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full border border-[#ff4d4d] flex items-center justify-center"
                        style={{
                          backgroundColor: isFilled ? '#ff4d4d' : 'transparent',
                        }}
                      >
                        {isFilled && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>

                  {field.type === 'select' && field.options ? (
                    <Select value={formData[field.id] || ''} onValueChange={(value) => onFieldChange(field.id, value)}>
                      <SelectTrigger
                        className={`border-l-4 transition-all ${
                          isRequired && !isFilled
                            ? 'border-l-[#ff4d4d] bg-red-50/20'
                            : 'border-l-primary'
                        }`}
                      >
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
                      className={`border-l-4 transition-all ${
                        isRequired && !isFilled
                          ? 'border-l-[#ff4d4d] bg-red-50/20'
                          : 'border-l-primary'
                      }`}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => onFieldChange(field.id, e.target.value)}
                      maxLength={field.maxLength}
                      className={`border-l-4 transition-all ${
                        isRequired && !isFilled
                          ? 'border-l-[#ff4d4d] bg-red-50/20'
                          : 'border-l-primary'
                      }`}
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
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full border border-[#ff4d4d] flex items-center justify-center mt-1"
                        style={{
                          backgroundColor: isFilled ? '#ff4d4d' : 'transparent',
                        }}
                      >
                        {isFilled && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    className={`min-h-32 resize-none border-l-4 transition-all ${
                      isRequired && !isFilled
                        ? 'border-l-[#ff4d4d] bg-red-50/20'
                        : 'border-l-primary'
                    }`}
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
