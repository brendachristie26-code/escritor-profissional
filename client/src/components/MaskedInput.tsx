import { Input } from '@/components/ui/input';

interface MaskedInputProps {
  type: 'cpf' | 'cnpj' | 'phone' | 'text';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}

const masks = {
  cpf: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  },
  cnpj: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  },
  phone: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})$/, '$1-$2$3')
      .slice(0, 15);
  },
};

export function MaskedInput({ type, value, onChange, ...props }: MaskedInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskFn = masks[type as keyof typeof masks];
    
    if (maskFn) {
      const maskedValue = maskFn(rawValue);
      onChange(maskedValue);
    } else {
      onChange(rawValue);
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
