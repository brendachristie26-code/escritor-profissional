export type DocumentType =
  | 'declaracao'
  | 'mensagem-formal'
  | 'proposta-comercial'
  | 'recurso-multa'
  | 'email-profissional'
  | 'reclamacao-condominio'
  | 'pedido-demissao'
  | 'notificacao-consumidor'
  | 'justificativa-escolar'
  | 'aviso-desocupacao'
  | 'pedido-desculpas'
  | 'cobranca'
  | 'aviso-reajuste'
  | 'notificacao-extrajudicial'
  | 'cancelamento-assinatura'
  | 'pedido-reembolso'
  | 'contestacao-vistoria'
  | 'resposta-feedback'
  | 'solicitacao-reparo'
  | 'pedido-prorrogacao'
  | 'declaracao-recebimento'
  | 'termo-distrato'
  | 'pedido-isencao'
  | 'solicitacao-documentos'
  | 'aviso-ferias'
  | 'autorizacao-entrada'
  | 'apresentacao-pessoal'
  | 'convite-formal';

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'textarea' | 'select' | 'number' | 'cpf' | 'cnpj';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  maxLength?: number;
}

export interface DocumentTemplate {
  id: DocumentType;
  title: string;
  category: string;
  description: string;
  fields: DocumentField[];
  template: (data: Record<string, string>) => string;
}

export const DOCUMENT_CATEGORIES = {
  legal: 'Documentos Legais',
  formal: 'Comunicação Formal',
  profissional: 'Documentos Profissionais',
  pessoal: 'Documentos Pessoais',
  comercial: 'Documentos Comerciais',
  administrativo: 'Documentos Administrativos',
};

export const DOCUMENT_TEMPLATES: Record<DocumentType, DocumentTemplate> = {
  declaracao: {
    id: 'declaracao',
    title: 'Declaração Simples',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Declaração formal para fins diversos',
    fields: [
      { id: 'nome', label: 'Seu Nome Completo', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'endereco', label: 'Endereço', type: 'text', required: true },
      { id: 'declaracao', label: 'O que você declara?', type: 'textarea', required: true, placeholder: 'Ex: Declaro que...' },
      { id: 'data', label: 'Data', type: 'date', required: true },
    ],
    template: (data) => `
DECLARAÇÃO

Eu, ${data.nome}, portador(a) da Cédula de Identidade e inscrito(a) no Cadastro de Pessoa Física sob o número ${data.cpf}, residente e domiciliado(a) em ${data.endereco}, por este meio declaro que:

${data.declaracao}

Por ser verdade, firmo a presente declaração para que produza seus efeitos legais.

${data.endereco}, ${new Date(data.data).toLocaleDateString('pt-BR')}

_________________________________
${data.nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'mensagem-formal': {
    id: 'mensagem-formal',
    title: 'Mensagem Formal',
    category: DOCUMENT_CATEGORIES.formal,
    description: 'Mensagem profissional para comunicação oficial',
    fields: [
      { id: 'destinatario', label: 'Destinatário', type: 'text', required: true },
      { id: 'cargo', label: 'Cargo do Destinatário', type: 'text', required: false },
      { id: 'assunto', label: 'Assunto', type: 'text', required: true },
      { id: 'corpo', label: 'Corpo da Mensagem', type: 'textarea', required: true },
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'seu_cargo', label: 'Seu Cargo', type: 'text', required: false },
    ],
    template: (data) => `
Prezado(a) ${data.cargo ? `${data.cargo} ` : ''}${data.destinatario},

Assunto: ${data.assunto}

${data.corpo}

Atenciosamente,

${data.seu_nome}
${data.seu_cargo ? `${data.seu_cargo}` : ''}
    `.trim(),
  },

  'proposta-comercial': {
    id: 'proposta-comercial',
    title: 'Proposta Comercial',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Proposta de serviço ou produto',
    fields: [
      { id: 'empresa', label: 'Sua Empresa', type: 'text', required: true },
      { id: 'cliente', label: 'Nome do Cliente', type: 'text', required: true },
      { id: 'servico', label: 'Descrição do Serviço/Produto', type: 'textarea', required: true },
      { id: 'valor', label: 'Valor (R$)', type: 'number', required: true },
      { id: 'prazo', label: 'Prazo de Entrega', type: 'text', required: true },
      { id: 'validade', label: 'Validade da Proposta (dias)', type: 'number', required: true },
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
    ],
    template: (data) => `
PROPOSTA COMERCIAL

Empresa: ${data.empresa}
Cliente: ${data.cliente}
Data: ${new Date().toLocaleDateString('pt-BR')}

DESCRIÇÃO DO SERVIÇO/PRODUTO:
${data.servico}

VALOR: R$ ${parseFloat(data.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

PRAZO DE ENTREGA: ${data.prazo}

VALIDADE DA PROPOSTA: ${data.validade} dias

Esta proposta é válida por ${data.validade} dias a partir da data acima.

Atenciosamente,

${data.seu_nome}
${data.empresa}
    `.trim(),
  },

  'recurso-multa': {
    id: 'recurso-multa',
    title: 'Recurso de Multa',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Recurso administrativo contra multa',
    fields: [
      { id: 'nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'numero_multa', label: 'Número da Multa', type: 'text', required: true },
      { id: 'motivo', label: 'Motivo do Recurso', type: 'textarea', required: true },
      { id: 'argumentos', label: 'Argumentos Legais', type: 'textarea', required: true },
    ],
    template: (data) => `
RECURSO ADMINISTRATIVO CONTRA MULTA

Recorrente: ${data.nome}
CPF: ${data.cpf}
Número da Multa: ${data.numero_multa}
Data: ${new Date().toLocaleDateString('pt-BR')}

MOTIVO DO RECURSO:
${data.motivo}

ARGUMENTOS LEGAIS:
${data.argumentos}

Solicito a revisão e anulação da multa acima mencionada.

Respeitosamente,

${data.nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'email-profissional': {
    id: 'email-profissional',
    title: 'E-mail Profissional',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'E-mail formal para comunicação profissional',
    fields: [
      { id: 'destinatario', label: 'Destinatário', type: 'text', required: true },
      { id: 'assunto', label: 'Assunto', type: 'text', required: true },
      { id: 'saudacao', label: 'Saudação', type: 'select', required: true, options: [
        { value: 'Prezado(a)', label: 'Prezado(a)' },
        { value: 'Caro(a)', label: 'Caro(a)' },
        { value: 'Olá', label: 'Olá' },
      ]},
      { id: 'corpo', label: 'Corpo do E-mail', type: 'textarea', required: true },
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
    ],
    template: (data) => `
Para: ${data.destinatario}
Assunto: ${data.assunto}

${data.saudacao} ${data.destinatario},

${data.corpo}

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'reclamacao-condominio': {
    id: 'reclamacao-condominio',
    title: 'Reclamação de Condomínio',
    category: DOCUMENT_CATEGORIES.administrativo,
    description: 'Reclamação formal ao síndico ou administração',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'apartamento', label: 'Apartamento/Unidade', type: 'text', required: true },
      { id: 'condominio', label: 'Nome do Condomínio', type: 'text', required: true },
      { id: 'reclamacao', label: 'Descrição da Reclamação', type: 'textarea', required: true },
      { id: 'data_ocorrencia', label: 'Data da Ocorrência', type: 'date', required: true },
    ],
    template: (data) => `
RECLAMAÇÃO FORMAL

Ao Síndico/Administração do Condomínio ${data.condominio}

De: ${data.seu_nome}
Unidade: ${data.apartamento}
Data: ${new Date().toLocaleDateString('pt-BR')}

Venho por meio desta apresentar reclamação formal sobre os seguintes fatos:

Descrição: ${data.reclamacao}

Data da Ocorrência: ${new Date(data.data_ocorrencia).toLocaleDateString('pt-BR')}

Solicito providências imediatas para resolução do problema.

Atenciosamente,

${data.seu_nome}
Unidade: ${data.apartamento}
    `.trim(),
  },

  'pedido-demissao': {
    id: 'pedido-demissao',
    title: 'Pedido de Demissão',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Comunicação formal de demissão',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome Completo', type: 'text', required: true },
      { id: 'empresa', label: 'Nome da Empresa', type: 'text', required: true },
      { id: 'cargo', label: 'Seu Cargo', type: 'text', required: true },
      { id: 'data_saida', label: 'Data de Saída Desejada', type: 'date', required: true },
      { id: 'motivo', label: 'Motivo (opcional)', type: 'textarea', required: false },
    ],
    template: (data) => `
PEDIDO DE DEMISSÃO

Prezados Senhores,

Venho por meio desta comunicar meu pedido de demissão do cargo de ${data.cargo} na empresa ${data.empresa}.

Minha data de saída será ${new Date(data.data_saida).toLocaleDateString('pt-BR')}, respeitando o aviso prévio conforme legislação vigente.

${data.motivo ? `Motivo: ${data.motivo}` : 'Agradeço pelas oportunidades de aprendizado e crescimento profissional durante minha permanência na empresa.'}

Coloco-me à disposição para facilitar a transição.

Atenciosamente,

${data.seu_nome}
Cargo: ${data.cargo}
    `.trim(),
  },

  'notificacao-consumidor': {
    id: 'notificacao-consumidor',
    title: 'Notificação de Consumidor',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Notificação formal ao consumidor (SAC nível 2, Procon)',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'empresa', label: 'Empresa/Fornecedor', type: 'text', required: true },
      { id: 'problema', label: 'Descrição do Problema', type: 'textarea', required: true },
      { id: 'data_problema', label: 'Data do Problema', type: 'date', required: true },
      { id: 'solucao', label: 'Solução Solicitada', type: 'textarea', required: true },
    ],
    template: (data) => `
NOTIFICAÇÃO FORMAL AO CONSUMIDOR

Empresa: ${data.empresa}
Consumidor: ${data.seu_nome}
CPF: ${data.cpf}
Data: ${new Date().toLocaleDateString('pt-BR')}

DESCRIÇÃO DO PROBLEMA:
${data.problema}

Data do Problema: ${new Date(data.data_problema).toLocaleDateString('pt-BR')}

SOLUÇÃO SOLICITADA:
${data.solucao}

Solicito resposta em até 30 dias. Caso não haja resolução, será acionado o Procon.

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'justificativa-escolar': {
    id: 'justificativa-escolar',
    title: 'Justificativa Escolar/Acadêmica',
    category: DOCUMENT_CATEGORIES.pessoal,
    description: 'Justificativa de ausência escolar ou acadêmica',
    fields: [
      { id: 'aluno', label: 'Nome do Aluno', type: 'text', required: true },
      { id: 'matricula', label: 'Matrícula', type: 'text', required: true },
      { id: 'instituicao', label: 'Instituição', type: 'text', required: true },
      { id: 'data_ausencia', label: 'Data da Ausência', type: 'date', required: true },
      { id: 'motivo', label: 'Motivo da Ausência', type: 'textarea', required: true },
      { id: 'responsavel', label: 'Nome do Responsável', type: 'text', required: true },
    ],
    template: (data) => `
JUSTIFICATIVA DE AUSÊNCIA

Instituição: ${data.instituicao}
Aluno: ${data.aluno}
Matrícula: ${data.matricula}
Data: ${new Date().toLocaleDateString('pt-BR')}

Venho por meio desta justificar a ausência do aluno ${data.aluno} na data de ${new Date(data.data_ausencia).toLocaleDateString('pt-BR')}.

MOTIVO:
${data.motivo}

Solicito que a ausência seja abonada.

Atenciosamente,

${data.responsavel}
Responsável por ${data.aluno}
    `.trim(),
  },

  'aviso-desocupacao': {
    id: 'aviso-desocupacao',
    title: 'Aviso de Desocupação de Aluguel',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Aviso formal de desocupação de imóvel alugado',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome (Inquilino)', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'endereco_imovel', label: 'Endereço do Imóvel', type: 'text', required: true },
      { id: 'proprietario', label: 'Nome do Proprietário', type: 'text', required: true },
      { id: 'data_desocupacao', label: 'Data de Desocupação', type: 'date', required: true },
      { id: 'condicoes', label: 'Condições da Desocupação', type: 'textarea', required: false },
    ],
    template: (data) => `
AVISO DE DESOCUPAÇÃO

Proprietário: ${data.proprietario}
Inquilino: ${data.seu_nome}
CPF: ${data.cpf}
Imóvel: ${data.endereco_imovel}
Data: ${new Date().toLocaleDateString('pt-BR')}

Venho por meio desta comunicar meu desejo de desocupar o imóvel acima mencionado na data de ${new Date(data.data_desocupacao).toLocaleDateString('pt-BR')}.

${data.condicoes ? `Condições da Desocupação:\n${data.condicoes}` : 'O imóvel será entregue em perfeitas condições de limpeza e conservação.'}

Solicito a devolução da caução conforme previsto em contrato.

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'pedido-desculpas': {
    id: 'pedido-desculpas',
    title: 'Pedido de Desculpas Profissional',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Desculpas formais por atrasos, erros ou falhas',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'destinatario', label: 'Destinatário', type: 'text', required: true },
      { id: 'motivo_erro', label: 'Descrição do Erro/Atraso', type: 'textarea', required: true },
      { id: 'impacto', label: 'Impacto Causado', type: 'textarea', required: true },
      { id: 'solucao', label: 'Solução Proposta', type: 'textarea', required: true },
    ],
    template: (data) => `
PEDIDO DE DESCULPAS FORMAL

Prezado(a) ${data.destinatario},

Venho por meio desta apresentar minhas sinceras desculpas por ${data.motivo_erro}.

Reconheço o impacto causado: ${data.impacto}

Para remediar a situação, proponho: ${data.solucao}

Comprometo-me a evitar que situações semelhantes ocorram novamente.

Agradeço sua compreensão.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  cobranca: {
    id: 'cobranca',
    title: 'Cobrança de Cliente Inadimplente',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Cobrança formal de débito pendente',
    fields: [
      { id: 'sua_empresa', label: 'Sua Empresa', type: 'text', required: true },
      { id: 'cliente', label: 'Nome do Cliente', type: 'text', required: true },
      { id: 'valor_devido', label: 'Valor Devido (R$)', type: 'number', required: true },
      { id: 'data_vencimento', label: 'Data de Vencimento', type: 'date', required: true },
      { id: 'descricao_servico', label: 'Descrição do Serviço/Produto', type: 'textarea', required: true },
      { id: 'numero_nota', label: 'Número da Nota/Fatura', type: 'text', required: true },
    ],
    template: (data) => `
AVISO DE COBRANÇA

Empresa Credora: ${data.sua_empresa}
Cliente Devedor: ${data.cliente}
Data: ${new Date().toLocaleDateString('pt-BR')}

DETALHES DO DÉBITO:
Número da Fatura: ${data.numero_nota}
Descrição: ${data.descricao_servico}
Valor Devido: R$ ${parseFloat(data.valor_devido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Data de Vencimento: ${new Date(data.data_vencimento).toLocaleDateString('pt-BR')}

Notificamos que o pagamento acima não foi recebido. Solicitamos a regularização em até 5 dias úteis.

Caso o pagamento já tenha sido realizado, desconsidere este aviso.

Atenciosamente,

${data.sua_empresa}
    `.trim(),
  },

  'aviso-reajuste': {
    id: 'aviso-reajuste',
    title: 'Aviso de Reajuste de Preço/Honorários',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Comunicação de reajuste de preços ou honorários',
    fields: [
      { id: 'sua_empresa', label: 'Sua Empresa/Nome', type: 'text', required: true },
      { id: 'cliente', label: 'Nome do Cliente', type: 'text', required: true },
      { id: 'preco_anterior', label: 'Preço Anterior (R$)', type: 'number', required: true },
      { id: 'preco_novo', label: 'Novo Preço (R$)', type: 'number', required: true },
      { id: 'motivo_reajuste', label: 'Motivo do Reajuste', type: 'textarea', required: true },
      { id: 'data_vigencia', label: 'Data de Vigência', type: 'date', required: true },
    ],
    template: (data) => {
      const percentualReajuste = (((parseFloat(data.preco_novo) - parseFloat(data.preco_anterior)) / parseFloat(data.preco_anterior)) * 100).toFixed(2);
      return `
AVISO DE REAJUSTE

Prezado(a) ${data.cliente},

Informamos que a partir de ${new Date(data.data_vigencia).toLocaleDateString('pt-BR')}, nossos preços sofrerão reajuste.

TABELA DE PREÇOS:
Preço Anterior: R$ ${parseFloat(data.preco_anterior).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Novo Preço: R$ ${parseFloat(data.preco_novo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Percentual de Reajuste: ${percentualReajuste}%

MOTIVO DO REAJUSTE:
${data.motivo_reajuste}

Agradecemos sua compreensão.

Atenciosamente,

${data.sua_empresa}
      `.trim();
    },
  },

  'notificacao-extrajudicial': {
    id: 'notificacao-extrajudicial',
    title: 'Notificação Extrajudicial Simples',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Notificação extrajudicial para fins diversos',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'notificado', label: 'Nome do Notificado', type: 'text', required: true },
      { id: 'assunto', label: 'Assunto da Notificação', type: 'text', required: true },
      { id: 'descricao', label: 'Descrição Detalhada', type: 'textarea', required: true },
      { id: 'prazo', label: 'Prazo para Resposta (dias)', type: 'number', required: true },
    ],
    template: (data) => `
NOTIFICAÇÃO EXTRAJUDICIAL

Notificante: ${data.seu_nome}
CPF: ${data.cpf}
Notificado: ${data.notificado}
Data: ${new Date().toLocaleDateString('pt-BR')}

ASSUNTO: ${data.assunto}

DESCRIÇÃO:
${data.descricao}

Solicito resposta em até ${data.prazo} dias. Caso não haja resposta satisfatória, serão tomadas as medidas legais cabíveis.

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'cancelamento-assinatura': {
    id: 'cancelamento-assinatura',
    title: 'Carta de Cancelamento de Assinatura/Serviço',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Solicitação formal de cancelamento',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'numero_cliente', label: 'Número de Cliente/Contrato', type: 'text', required: true },
      { id: 'servico', label: 'Serviço/Assinatura', type: 'text', required: true },
      { id: 'motivo', label: 'Motivo do Cancelamento', type: 'textarea', required: true },
      { id: 'data_cancelamento', label: 'Data Desejada para Cancelamento', type: 'date', required: true },
    ],
    template: (data) => `
SOLICITAÇÃO DE CANCELAMENTO

Prezados Senhores,

Venho por meio desta solicitar o cancelamento de minha assinatura/serviço:

Serviço: ${data.servico}
Número de Cliente: ${data.numero_cliente}
Data Desejada: ${new Date(data.data_cancelamento).toLocaleDateString('pt-BR')}

MOTIVO DO CANCELAMENTO:
${data.motivo}

Solicito confirmação do cancelamento e informações sobre possíveis cobranças pendentes.

Atenciosamente,

${data.seu_nome}
Número de Cliente: ${data.numero_cliente}
    `.trim(),
  },

  'pedido-reembolso': {
    id: 'pedido-reembolso',
    title: 'Pedido de Reembolso/Estorno',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Solicitação formal de reembolso',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'empresa', label: 'Empresa/Loja', type: 'text', required: true },
      { id: 'valor', label: 'Valor do Reembolso (R$)', type: 'number', required: true },
      { id: 'data_compra', label: 'Data da Compra', type: 'date', required: true },
      { id: 'motivo', label: 'Motivo do Reembolso', type: 'textarea', required: true },
      { id: 'numero_pedido', label: 'Número do Pedido/Nota', type: 'text', required: true },
    ],
    template: (data) => `
PEDIDO DE REEMBOLSO/ESTORNO

Prezados Senhores,

Solicito o reembolso/estorno referente à seguinte compra:

Empresa: ${data.empresa}
Número do Pedido: ${data.numero_pedido}
Data da Compra: ${new Date(data.data_compra).toLocaleDateString('pt-BR')}
Valor: R$ ${parseFloat(data.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

MOTIVO DO REEMBOLSO:
${data.motivo}

Solicito o processamento do reembolso em até 30 dias.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'contestacao-vistoria': {
    id: 'contestacao-vistoria',
    title: 'Contestação de Vistoria de Imóvel',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Contestação formal de relatório de vistoria',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'endereco_imovel', label: 'Endereço do Imóvel', type: 'text', required: true },
      { id: 'data_vistoria', label: 'Data da Vistoria', type: 'date', required: true },
      { id: 'pontos_contestacao', label: 'Pontos em Contestação', type: 'textarea', required: true },
      { id: 'argumentos', label: 'Argumentos/Provas', type: 'textarea', required: true },
    ],
    template: (data) => `
CONTESTAÇÃO DE VISTORIA

Interessado: ${data.seu_nome}
CPF: ${data.cpf}
Imóvel: ${data.endereco_imovel}
Data: ${new Date().toLocaleDateString('pt-BR')}

Contesto os seguintes pontos do relatório de vistoria realizada em ${new Date(data.data_vistoria).toLocaleDateString('pt-BR')}:

PONTOS EM CONTESTAÇÃO:
${data.pontos_contestacao}

ARGUMENTOS/PROVAS:
${data.argumentos}

Solicito a revisão do relatório e correção dos erros apontados.

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'resposta-feedback': {
    id: 'resposta-feedback',
    title: 'Resposta a Feedback Negativo/Avaliação Ruim',
    category: DOCUMENT_CATEGORIES.comercial,
    description: 'Resposta profissional a críticas ou avaliações negativas',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome/Empresa', type: 'text', required: true },
      { id: 'cliente', label: 'Nome do Cliente', type: 'text', required: true },
      { id: 'feedback', label: 'Resumo do Feedback Negativo', type: 'textarea', required: true },
      { id: 'resposta', label: 'Sua Resposta/Explicação', type: 'textarea', required: true },
      { id: 'solucao', label: 'Solução Proposta', type: 'textarea', required: true },
    ],
    template: (data) => `
RESPOSTA A FEEDBACK

Prezado(a) ${data.cliente},

Agradecemos por compartilhar seu feedback. Levamos muito a sério todas as críticas e sugestões.

FEEDBACK RECEBIDO:
${data.feedback}

NOSSA RESPOSTA:
${data.resposta}

SOLUÇÃO PROPOSTA:
${data.solucao}

Esperamos ter a oportunidade de recuperar sua confiança.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'solicitacao-reparo': {
    id: 'solicitacao-reparo',
    title: 'Solicitação de Reparo/Manutenção',
    category: DOCUMENT_CATEGORIES.administrativo,
    description: 'Solicitação formal de reparo ou manutenção',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'endereco', label: 'Endereço/Local', type: 'text', required: true },
      { id: 'problema', label: 'Descrição do Problema', type: 'textarea', required: true },
      { id: 'urgencia', label: 'Nível de Urgência', type: 'select', required: true, options: [
        { value: 'Baixa', label: 'Baixa' },
        { value: 'Média', label: 'Média' },
        { value: 'Alta', label: 'Alta' },
        { value: 'Emergência', label: 'Emergência' },
      ]},
      { id: 'telefone', label: 'Telefone para Contato', type: 'phone', required: true },
    ],
    template: (data) => `
SOLICITAÇÃO DE REPARO/MANUTENÇÃO

Solicitante: ${data.seu_nome}
Local: ${data.endereco}
Data: ${new Date().toLocaleDateString('pt-BR')}
Urgência: ${data.urgencia}

DESCRIÇÃO DO PROBLEMA:
${data.problema}

CONTATO:
Telefone: ${data.telefone}

Solicito atendimento conforme o nível de urgência indicado.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'pedido-prorrogacao': {
    id: 'pedido-prorrogacao',
    title: 'Pedido de Prorrogação de Prazo',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Solicitação formal de extensão de prazo',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'destinatario', label: 'Destinatário', type: 'text', required: true },
      { id: 'projeto_tarefa', label: 'Projeto/Tarefa', type: 'text', required: true },
      { id: 'prazo_original', label: 'Prazo Original', type: 'date', required: true },
      { id: 'novo_prazo', label: 'Novo Prazo Solicitado', type: 'date', required: true },
      { id: 'motivo', label: 'Motivo da Prorrogação', type: 'textarea', required: true },
    ],
    template: (data) => `
PEDIDO DE PRORROGAÇÃO DE PRAZO

Prezado(a) ${data.destinatario},

Solicito a prorrogação do prazo para o projeto/tarefa abaixo:

Projeto/Tarefa: ${data.projeto_tarefa}
Prazo Original: ${new Date(data.prazo_original).toLocaleDateString('pt-BR')}
Novo Prazo Solicitado: ${new Date(data.novo_prazo).toLocaleDateString('pt-BR')}

MOTIVO:
${data.motivo}

Comprometo-me a entregar o trabalho no novo prazo.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'declaracao-recebimento': {
    id: 'declaracao-recebimento',
    title: 'Declaração de Recebimento/Recibo Formal',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Recibo formal de recebimento de bens ou valores',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome (Recebedor)', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'remetente', label: 'Nome do Remetente', type: 'text', required: true },
      { id: 'descricao_item', label: 'Descrição do Item/Valor Recebido', type: 'textarea', required: true },
      { id: 'valor', label: 'Valor (se aplicável)', type: 'number', required: false },
      { id: 'data_recebimento', label: 'Data de Recebimento', type: 'date', required: true },
    ],
    template: (data) => `
DECLARAÇÃO DE RECEBIMENTO

Recebedor: ${data.seu_nome}
CPF: ${data.cpf}
Remetente: ${data.remetente}
Data: ${new Date(data.data_recebimento).toLocaleDateString('pt-BR')}

Declaro que recebi de ${data.remetente} o seguinte:

DESCRIÇÃO:
${data.descricao_item}

${data.valor ? `VALOR: R$ ${parseFloat(data.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''}

Em perfeito estado de conservação e funcionamento.

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'termo-distrato': {
    id: 'termo-distrato',
    title: 'Termo de Distrato (Encerramento de Contrato Amigável)',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Documento de encerramento consensual de contrato',
    fields: [
      { id: 'parte1', label: 'Primeira Parte', type: 'text', required: true },
      { id: 'cpf1', label: 'CPF/CNPJ Primeira Parte', type: 'text', required: true },
      { id: 'parte2', label: 'Segunda Parte', type: 'text', required: true },
      { id: 'cpf2', label: 'CPF/CNPJ Segunda Parte', type: 'text', required: true },
      { id: 'contrato_original', label: 'Descrição do Contrato Original', type: 'textarea', required: true },
      { id: 'clausulas_finais', label: 'Cláusulas de Encerramento', type: 'textarea', required: true },
    ],
    template: (data) => `
TERMO DE DISTRATO

Partes: ${data.parte1} (${data.cpf1}) e ${data.parte2} (${data.cpf2})
Data: ${new Date().toLocaleDateString('pt-BR')}

As partes acima acordam em rescindir mutuamente o seguinte contrato:

CONTRATO ORIGINAL:
${data.contrato_original}

CLÁUSULAS DE ENCERRAMENTO:
${data.clausulas_finais}

Ambas as partes declaram estar satisfeitas com este encerramento e renunciam a quaisquer reclamações futuras.

${data.parte1}
CPF/CNPJ: ${data.cpf1}

${data.parte2}
CPF/CNPJ: ${data.cpf2}
    `.trim(),
  },

  'pedido-isencao': {
    id: 'pedido-isencao',
    title: 'Pedido de Isenção de Multa/Juros',
    category: DOCUMENT_CATEGORIES.legal,
    description: 'Solicitação formal de isenção de multa ou juros',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'orgao', label: 'Órgão/Empresa Credora', type: 'text', required: true },
      { id: 'valor_original', label: 'Valor Original (R$)', type: 'number', required: true },
      { id: 'multa_juros', label: 'Multa/Juros (R$)', type: 'number', required: true },
      { id: 'motivo', label: 'Motivo do Pedido', type: 'textarea', required: true },
    ],
    template: (data) => `
PEDIDO DE ISENÇÃO DE MULTA/JUROS

Solicitante: ${data.seu_nome}
CPF: ${data.cpf}
Órgão/Empresa: ${data.orgao}
Data: ${new Date().toLocaleDateString('pt-BR')}

Solicito a isenção de multa e juros referentes ao débito abaixo:

Valor Original: R$ ${parseFloat(data.valor_original).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Multa/Juros: R$ ${parseFloat(data.multa_juros).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

MOTIVO DO PEDIDO:
${data.motivo}

Comprometo-me a regularizar o débito principal.

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'solicitacao-documentos': {
    id: 'solicitacao-documentos',
    title: 'Solicitação de Documentos Oficiais',
    category: DOCUMENT_CATEGORIES.administrativo,
    description: 'Solicitação formal de documentos a órgãos públicos',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'orgao', label: 'Órgão Público', type: 'text', required: true },
      { id: 'documentos_solicitados', label: 'Documentos Solicitados', type: 'textarea', required: true },
      { id: 'motivo', label: 'Motivo da Solicitação', type: 'textarea', required: true },
      { id: 'email', label: 'E-mail para Resposta', type: 'email', required: true },
    ],
    template: (data) => `
SOLICITAÇÃO DE DOCUMENTOS OFICIAIS

Solicitante: ${data.seu_nome}
CPF: ${data.cpf}
Órgão: ${data.orgao}
Data: ${new Date().toLocaleDateString('pt-BR')}

Solicito os seguintes documentos:

DOCUMENTOS SOLICITADOS:
${data.documentos_solicitados}

MOTIVO:
${data.motivo}

Solicito resposta em até 30 dias conforme Lei de Acesso à Informação.

Contato: ${data.email}

Atenciosamente,

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'aviso-ferias': {
    id: 'aviso-ferias',
    title: 'Aviso de Férias/Ausência Temporária',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Comunicação de período de férias ou ausência',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'cargo', label: 'Seu Cargo', type: 'text', required: true },
      { id: 'data_inicio', label: 'Data de Início', type: 'date', required: true },
      { id: 'data_fim', label: 'Data de Término', type: 'date', required: true },
      { id: 'responsavel_substituto', label: 'Responsável Substituto', type: 'text', required: true },
      { id: 'contato_emergencia', label: 'Contato de Emergência', type: 'phone', required: false },
    ],
    template: (data) => `
AVISO DE FÉRIAS/AUSÊNCIA

Prezados Colegas,

Informo que estarei ausente no período de ${new Date(data.data_inicio).toLocaleDateString('pt-BR')} a ${new Date(data.data_fim).toLocaleDateString('pt-BR')}.

Cargo: ${data.cargo}
Responsável Substituto: ${data.responsavel_substituto}

${data.contato_emergencia ? `Contato de Emergência: ${data.contato_emergencia}` : ''}

Retornarei no dia ${new Date(new Date(data.data_fim).getTime() + 86400000).toLocaleDateString('pt-BR')}.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },

  'autorizacao-entrada': {
    id: 'autorizacao-entrada',
    title: 'Autorização de Entrada/Prestador de Serviço',
    category: DOCUMENT_CATEGORIES.administrativo,
    description: 'Autorização formal para acesso a imóvel',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome (Proprietário/Responsável)', type: 'text', required: true },
      { id: 'cpf', label: 'CPF', type: 'cpf', required: true },
      { id: 'endereco', label: 'Endereço do Imóvel', type: 'text', required: true },
      { id: 'prestador', label: 'Nome do Prestador/Visitante', type: 'text', required: true },
      { id: 'servico', label: 'Serviço a Realizar', type: 'textarea', required: true },
      { id: 'data_autorizacao', label: 'Data da Autorização', type: 'date', required: true },
      { id: 'horario', label: 'Horário de Acesso', type: 'text', required: true },
    ],
    template: (data) => `
AUTORIZAÇÃO DE ENTRADA

Proprietário/Responsável: ${data.seu_nome}
CPF: ${data.cpf}
Imóvel: ${data.endereco}
Data: ${new Date().toLocaleDateString('pt-BR')}

Autorizo a entrada do(a) prestador(a) abaixo mencionado(a):

Prestador/Visitante: ${data.prestador}
Serviço: ${data.servico}
Data da Autorização: ${new Date(data.data_autorizacao).toLocaleDateString('pt-BR')}
Horário: ${data.horario}

O acesso é limitado aos horários e áreas necessárias para a realização do serviço.

${data.seu_nome}
CPF: ${data.cpf}
    `.trim(),
  },

  'apresentacao-pessoal': {
    id: 'apresentacao-pessoal',
    title: 'Apresentação Pessoal Profissional (Bio/Perfil)',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Biografia ou perfil profissional formal',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome Completo', type: 'text', required: true },
      { id: 'profissao', label: 'Profissão/Cargo', type: 'text', required: true },
      { id: 'experiencia', label: 'Experiência Profissional', type: 'textarea', required: true },
      { id: 'formacao', label: 'Formação Acadêmica', type: 'textarea', required: true },
      { id: 'habilidades', label: 'Principais Habilidades', type: 'textarea', required: true },
      { id: 'contato', label: 'Contato Profissional', type: 'email', required: true },
    ],
    template: (data) => `
APRESENTAÇÃO PROFISSIONAL

${data.seu_nome}
${data.profissao}

SOBRE:
${data.seu_nome} é um(a) profissional experiente na área de ${data.profissao}.

EXPERIÊNCIA PROFISSIONAL:
${data.experiencia}

FORMAÇÃO ACADÊMICA:
${data.formacao}

PRINCIPAIS HABILIDADES:
${data.habilidades}

CONTATO:
${data.contato}
    `.trim(),
  },

  'convite-formal': {
    id: 'convite-formal',
    title: 'Convite Formal/Solicitação de Reunião',
    category: DOCUMENT_CATEGORIES.profissional,
    description: 'Convite ou solicitação formal de reunião',
    fields: [
      { id: 'seu_nome', label: 'Seu Nome', type: 'text', required: true },
      { id: 'convidado', label: 'Nome do Convidado', type: 'text', required: true },
      { id: 'assunto', label: 'Assunto da Reunião', type: 'text', required: true },
      { id: 'data', label: 'Data Proposta', type: 'date', required: true },
      { id: 'horario', label: 'Horário', type: 'text', required: true },
      { id: 'local', label: 'Local/Plataforma', type: 'text', required: true },
      { id: 'descricao', label: 'Descrição da Reunião', type: 'textarea', required: true },
    ],
    template: (data) => `
CONVITE FORMAL

Prezado(a) ${data.convidado},

Convido-o(a) para uma reunião:

ASSUNTO: ${data.assunto}

DATA: ${new Date(data.data).toLocaleDateString('pt-BR')}
HORÁRIO: ${data.horario}
LOCAL/PLATAFORMA: ${data.local}

DESCRIÇÃO:
${data.descricao}

Solicito confirmação de sua presença.

Atenciosamente,

${data.seu_nome}
    `.trim(),
  },
};
