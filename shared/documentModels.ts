export type HeaderModelId = 'classico' | 'corporativo' | 'minimalista';
export type SignatureModelId = 'formal' | 'simples' | 'digital';

export interface DocumentModelOption<T extends string> {
  id: T;
  name: string;
  description: string;
}

export const HEADER_MODELS: DocumentModelOption<HeaderModelId>[] = [
  {
    id: 'classico',
    name: 'Clássico',
    description: 'Título centralizado e apresentação tradicional.',
  },
  {
    id: 'corporativo',
    name: 'Corporativo',
    description: 'Nome da ferramenta, título e linha divisória.',
  },
  {
    id: 'minimalista',
    name: 'Minimalista',
    description: 'Título discreto com mais espaço para o conteúdo.',
  },
];

export const SIGNATURE_MODELS: DocumentModelOption<SignatureModelId>[] = [
  {
    id: 'formal',
    name: 'Formal',
    description: 'Fechamento com tratamento e linha de assinatura.',
  },
  {
    id: 'simples',
    name: 'Simples',
    description: 'Apenas o nome do responsável ao final.',
  },
  {
    id: 'digital',
    name: 'Digital',
    description: 'Indicação de assinatura digital e data de geração.',
  },
];

function removeExistingHeading(content: string): string {
  const lines = content.trim().split('\n');
  const firstLine = lines[0]?.trim() ?? '';
  const isHeading = firstLine.length > 2 && firstLine === firstLine.toUpperCase();
  return (isHeading ? lines.slice(1) : lines).join('\n').trim();
}

function removeExistingSignature(content: string): string {
  return content
    .replace(/\n+_{5,}[\s\S]*$/m, '')
    .replace(/\n+(Atenciosamente|Respeitosamente|Cordialmente),?[\s\S]*$/im, '')
    .trim();
}

function buildHeader(title: string, model: HeaderModelId): string {
  if (model === 'corporativo') {
    return `ESCRITOR PROFISSIONAL\n${title.toUpperCase()}\n--------------------------------------------`;
  }

  if (model === 'minimalista') {
    return title;
  }

  return title.toUpperCase();
}

function buildSignature(authorName: string, model: SignatureModelId): string {
  if (model === 'simples') {
    return authorName;
  }

  if (model === 'digital') {
    return `ASSINATURA DIGITAL\n${authorName}\nGerado em ${new Date().toLocaleDateString('pt-BR')}`;
  }

  return `Atenciosamente,\n\n________________________________________\n${authorName}`;
}

export function composeDocument(
  content: string,
  title: string,
  headerModel: HeaderModelId,
  signatureModel: SignatureModelId,
  authorName: string,
): string {
  if (!content.trim()) return '';

  const body = removeExistingSignature(removeExistingHeading(content));
  const header = buildHeader(title, headerModel);
  const signature = buildSignature(authorName || 'Responsável', signatureModel);

  return `${header}\n\n${body}\n\n${signature}`.trim();
}
