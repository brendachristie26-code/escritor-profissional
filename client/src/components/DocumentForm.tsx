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

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-secondary rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Progresso do Formulário</span>
          <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {filledRequiredFields} de {requiredFields.length} campos obrigatórios preenchidos
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {template.fields.map(field => {
          const isFilled = formData[field.id]?.trim() ? true : false;
          const isRequired = field.required;

          return (
            <div key={field.id} className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor={field.id} className="text-sm font-semibold flex-1">
                  {field.label}
                </Label>
                {isRequired && (
                  isFilled ? (
                    <CheckCircle2 size={16} className="text-green-600" />
                  ) : (
                    <Circle size={16} className="text-destructive" />
                  )
                )}
              </div>

              {field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  className={`mt-1 min-h-24 ${isRequired && !isFilled ? 'border-destructive/50' : ''}`}
                />
              ) : field.type === 'select' && field.options ? (
                <Select value={formData[field.id] || ''} onValueChange={(value) => onFieldChange(field.id, value)}>
                  <SelectTrigger className={`mt-1 ${isRequired && !isFilled ? 'border-destructive/50' : ''}`}>
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
                  className={`mt-1 ${isRequired && !isFilled ? 'border-destructive/50' : ''}`}
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  maxLength={field.maxLength}
                  className={`mt-1 ${isRequired && !isFilled ? 'border-destructive/50' : ''}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
