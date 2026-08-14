import { DOCUMENT_TEMPLATES, DocumentType, DocumentField } from './documentTypes';

const EXAMPLE_DATE = '2026-08-14';

const VALUE_BY_ID: Record<string, string> = {
  nome: 'João Silva Santos',
  seu_nome: 'João Silva Santos',
  seu_nome_completo: 'João Silva Santos',
  cpf: '123.456.789-00',
  cnpj: '12.345.678/0001-90',
  endereco: 'Rua das Flores, 123, São Paulo - SP',
  endereco_imovel: 'Rua das Acácias, 456, São Paulo - SP',
  destinatario: 'Dra. Mariana Oliveira',
  cargo: 'Diretora Administrativa',
  cargo_destinatario: 'Diretora Administrativa',
  assunto: 'Solicitação de providências e alinhamento',
  corpo: 'Prezados,\n\nEscrevo para solicitar o devido acompanhamento desta demanda. Agradeço a atenção e fico à disposição para fornecer informações complementares.\n\nAguardo um retorno assim que possível.',
  saudacao: 'Prezado(a)',
  seu_cargo: 'Gerente de Projetos',
  seu_email: 'joao.silva@email.com',
  email: 'joao.silva@email.com',
  telefone: '(11) 99999-0000',
  empresa: 'Soluções Profissionais Brasil Ltda.',
  sua_empresa: 'Soluções Profissionais Brasil Ltda.',
  empresa_cliente: 'Cliente Exemplo Comércio Ltda.',
  cliente: 'Cliente Exemplo Comércio Ltda.',
  contato_cliente: 'Roberto Almeida',
  servico: 'Consultoria especializada e acompanhamento técnico personalizado.',
  descricao_servico: 'Consultoria especializada e acompanhamento técnico personalizado.',
  descricao_produto: 'Produto com especificações e condições descritas na proposta.',
  valor: '2500',
  valor_proposto: '2500',
  valor_devido: '1800',
  valor_multa: '250',
  valor_juros: '80',
  valor_compra: '450',
  valor_item: '2500',
  valor_anterior: '99.90',
  valor_novo: '119.90',
  prazo: '30 dias',
  prazo_entrega: '30 dias',
  validade: '15',
  numero_multa: 'MUL-2026-001234',
  motivo: 'Circunstâncias excepcionais devidamente comprovadas e necessidade de revisão da situação.',
  motivo_recurso: 'Sinalização insuficiente no local e circunstâncias que justificam a revisão da penalidade.',
  argumentos: 'A situação ocorreu em circunstâncias excepcionais. Solicito a análise dos documentos anexos e a revisão da decisão, considerando os princípios da razoabilidade e da boa-fé.',
  numero_pedido: 'PED-2026-005678',
  numero_nf: 'NF-2026-001234',
  numero_fatura: 'FAT-2026-001234',
  numero_contrato: 'CTR-2026-0042',
  produto: 'Notebook profissional com garantia vigente',
  problema: 'O produto apresentou falha de funcionamento logo após o recebimento.',
  solucao: 'Solicito o reparo, a substituição do produto ou o reembolso, conforme a solução aplicável ao caso.',
  data_problema: EXAMPLE_DATE,
  data_compra: '2026-07-20',
  data_vencimento: '2026-08-01',
  data_emissao: '2026-07-01',
  data: EXAMPLE_DATE,
  data_solicitacao: EXAMPLE_DATE,
  data_ausencia: '2026-08-10',
  data_ocorrencia: '2026-08-09',
  data_saida: '2026-09-01',
  data_desocupacao: '2026-09-01',
  data_reajuste: '2026-09-01',
  data_vistoria: '2026-08-05',
  data_reembolso: EXAMPLE_DATE,
  data_entrega_original: '2026-08-20',
  data_entrega: '2026-09-20',
  data_inicio: '2026-09-01',
  data_fim: '2026-09-30',
  data_inicio_ferias: '2026-09-01',
  data_fim_ferias: '2026-09-15',
  data_evento: '2026-10-15',
  data_entrada: '2026-08-20',
  data_contrato: '2026-01-15',
  data_contrato_original: '2026-01-15',
  data_distrato: EXAMPLE_DATE,
  data_pagamento: '2026-08-20',
  hora: '09:00',
  horario: '09:00 às 12:00',
  local: 'Centro Empresarial Paulista — São Paulo/SP',
  evento: 'Encontro Profissional de Comunicação 2026',
  convidado: 'Dr. Carlos Alberto Mendes',
  convidado_nome: 'Dr. Carlos Alberto Mendes',
  cargo_convidado: 'Diretor Executivo',
  apartamento: '402',
  unidade: '402',
  condominio: 'Condomínio Jardim das Acácias',
  reclamacao: 'Barulho excessivo durante o período de silêncio, prejudicando o descanso dos moradores.',
  tipo_reclamacao: 'Barulho excessivo',
  unidade_reclamada: '401',
  descricao: 'Solicito providências para resolver a situação descrita e evitar novas ocorrências.',
  descricao_reclamacao: 'Solicito providências para resolver a situação descrita e evitar novas ocorrências.',
  descricao_problema: 'Foi identificado um problema que precisa de análise e solução dentro do prazo adequado.',
  tipo_reparo: 'Vazamento na cozinha',
  descricao_reparo: 'Vazamento na tubulação sob a pia, com risco de danos ao armário e ao piso.',
  urgencia: 'Alta',
  tipo_multa: 'Multa por atraso de pagamento',
  tipo_documento: 'Documento formal para fins administrativos',
  instituicao: 'Universidade Exemplo de São Paulo',
  escola: 'Colégio Estadual Exemplo',
  aluno: 'Gabriel Oliveira Santos',
  matricula: '2026-001234',
  responsavel: 'Mariana Oliveira Santos',
  responsavel_substituicao: 'Ana Paula Silva',
  motivo_ausencia: 'Consulta médica previamente agendada.',
  motivo_erro: 'um atraso na entrega da solicitação',
  impacto: 'Reconheço que a situação causou transtornos e afetou o planejamento da outra parte.',
  solucao_proposta: 'prioridade no atendimento e acompanhamento até a conclusão da demanda',
  mensagem: 'Agradeço pela compreensão e reforço meu compromisso com a solução responsável da situação.',
  observacoes: 'Todas as informações relevantes foram conferidas antes do envio.',
  empresa_fornecedor: 'Fornecedor Exemplo Comércio Ltda.',
  fornecedor: 'Fornecedor Exemplo Comércio Ltda.',
  servico_assinatura: 'Plano Profissional de Atendimento',
  assinatura: 'Plano Profissional de Atendimento',
  motivo_cancelamento: 'O serviço deixou de atender à necessidade atual.',
  motivo_contestacao: 'A vistoria não refletiu corretamente o estado do imóvel na data da entrega.',
  detalhes: 'Os reparos e condições existentes foram registrados com fotografias e comprovantes.',
  rating: '2 estrelas',
  rating_anterior: '2 estrelas',
  motivo_reclamacao: 'Atraso na entrega do pedido',
  resposta: 'Agradecemos o feedback. Estamos revisando o processo e já adotamos medidas para evitar a repetição da situação.',
  trabalho: 'Projeto final de conclusão de curso',
  instituicao_destino: 'Prefeitura Municipal de São Paulo',
  orgao_destino: 'Prefeitura Municipal de São Paulo',
  documentos_solicitados: 'Certidão, declaração e cópia do processo administrativo',
  motivo_solicitacao: 'Atualização cadastral e participação em processo seletivo.',
  cargo_atual: 'Analista de Sistemas',
  profissao: 'Analista de Sistemas Sênior',
  experiencia: 'Mais de 8 anos de experiência em projetos digitais e gestão de equipes.',
  especializacoes: 'Desenvolvimento Full Stack, gestão de projetos e melhoria de processos.',
  objetivo: 'Busco contribuir em projetos relevantes, com foco em qualidade, clareza e resultados.',
  descricao_contrato: 'Contrato de prestação de serviços de consultoria especializada.',
  motivo_distrato: 'Acordo mútuo entre as partes, sem pendências a resolver.',
  parte1: 'João Silva Santos',
  parte2: 'Maria Oliveira Costa',
  cpf_parte1: '123.456.789-00',
  cpf_parte2: '987.654.321-00',
  devedor: 'Pedro Alves de Souza',
  cpf_devedor: '987.654.321-00',
  descricao_divida: 'Serviços prestados conforme contrato e ainda não quitados.',
  prazo_pagamento: '10 dias',
  solicitante: 'João Silva Santos',
  nome_solicitante: 'João Silva Santos',
  prestador_servico: 'João Silva — Serviços Técnicos',
  motivo_entrada: 'Reparo de manutenção previamente agendado.',
  justificativa: 'A solicitação é necessária para regularizar a situação e permitir a continuidade do atendimento.',
  parte_interessada: 'Maria Oliveira Costa',
  remetente: 'Soluções Profissionais Brasil Ltda.',
  recebedor: 'Maria Oliveira Costa',
  descricao_item: 'Notebook profissional em perfeito estado de conservação',
  numero_serie: 'SPB-2026-00042',
};

function valueForField(field: DocumentField): string {
  if (field.type === 'select') {
    return field.options?.[0]?.value ?? 'opcao-1';
  }

  if (field.type === 'date') {
    return VALUE_BY_ID[field.id] ?? EXAMPLE_DATE;
  }

  if (field.type === 'email') {
    return VALUE_BY_ID[field.id] ?? 'exemplo@email.com';
  }

  if (field.type === 'phone') {
    return VALUE_BY_ID[field.id] ?? '(11) 99999-0000';
  }

  if (field.type === 'cpf') {
    return VALUE_BY_ID[field.id] ?? '123.456.789-00';
  }

  if (field.type === 'cnpj') {
    return VALUE_BY_ID[field.id] ?? '12.345.678/0001-90';
  }

  if (field.type === 'number') {
    if (/validade|prazo|dias|quantidade|horas/i.test(`${field.id} ${field.label}`)) return '15';
    return VALUE_BY_ID[field.id] ?? '2500';
  }

  return VALUE_BY_ID[field.id] ?? `Exemplo preenchido para ${field.label.toLowerCase()}.`;
}

export const EXAMPLE_DATA: Record<DocumentType, Record<string, string>> = Object.fromEntries(
  Object.entries(DOCUMENT_TEMPLATES).map(([id, template]) => [
    id,
    Object.fromEntries(template.fields.map(field => [field.id, valueForField(field)])),
  ]),
) as Record<DocumentType, Record<string, string>>;

export function getExampleData(documentType: DocumentType): Record<string, string> {
  return { ...(EXAMPLE_DATA[documentType] ?? {}) };
}

export { EXAMPLE_DATE };
