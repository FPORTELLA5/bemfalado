import type { BusinessPraise } from '../models/business-praise.model';

/**
 * Elogios fictícios para validar a apresentação da página de detalhes.
 * Substituir por dados reais da API quando o backend estiver integrado.
 */
export const MOCK_BUSINESS_PRAISES: readonly BusinessPraise[] = [
  {
    id: 'praise-001',
    businessId: 'mock-001',
    authorDisplayName: 'Mariana R.',
    publishedAt: '2026-10-28',
    title: 'Atendimento que faz a diferença',
    content: 'Fui tomar um café no fim da tarde e gostei muito da atenção da equipe. Os produtos são bem preparados e o ambiente é agradável para conversar ou trabalhar.',
    praisedQualities: ['Atendimento', 'Qualidade dos produtos']
  },
  {
    id: 'praise-002',
    businessId: 'mock-001',
    authorDisplayName: 'Carlos M.',
    publishedAt: '2026-10-19',
    title: 'Um ótimo café de bairro',
    content: 'Boa variedade de cafés e opções artesanais. Fui bem atendido desde a chegada e achei o espaço muito bem cuidado.',
    praisedQualities: ['Variedade', 'Ambiente']
  },
  {
    id: 'praise-003',
    businessId: 'mock-002',
    authorDisplayName: 'Paula S.',
    publishedAt: '2026-10-30',
    title: 'Encontrei exatamente o que procurava',
    content: 'A loja tem bastante variedade e a equipe ajudou sem pressa. A entrega chegou dentro do prazo e os produtos vieram muito bem embalados.',
    praisedQualities: ['Variedade', 'Entrega']
  },
  {
    id: 'praise-004',
    businessId: 'mock-002',
    authorDisplayName: 'Renata L.',
    publishedAt: '2026-10-16',
    title: 'Cuidado em cada detalhe',
    content: 'Gostei da experiência de compra. Recebi orientações claras e encontrei boas opções para deixar minha casa do jeito que queria.',
    praisedQualities: ['Atendimento', 'Qualidade']
  },
  {
    id: 'praise-005',
    businessId: 'mock-003',
    authorDisplayName: 'André F.',
    publishedAt: '2026-11-02',
    title: 'Equipe muito atenciosa',
    content: 'Desde a recepção até o atendimento, fui tratado com atenção e respeito. As informações foram explicadas com clareza.',
    praisedQualities: ['Acolhimento', 'Organização']
  },
  {
    id: 'praise-006',
    businessId: 'mock-003',
    authorDisplayName: 'Luciana P.',
    publishedAt: '2026-10-21',
    title: 'Organização e cuidado',
    content: 'O espaço é organizado e a equipe demonstra cuidado com as pessoas. Minha experiência foi muito positiva.',
    praisedQualities: ['Organização', 'Cuidado']
  },
  {
    id: 'praise-007',
    businessId: 'mock-004',
    authorDisplayName: 'Bianca T.',
    publishedAt: '2026-10-26',
    title: 'Uma experiência muito agradável',
    content: 'Fui recebida com bastante cuidado. O ambiente é tranquilo e o atendimento foi atencioso durante todo o serviço.',
    praisedQualities: ['Cuidado', 'Ambiente']
  },
  {
    id: 'praise-008',
    businessId: 'mock-004',
    authorDisplayName: 'Sofia A.',
    publishedAt: '2026-10-12',
    title: 'Atendimento cuidadoso',
    content: 'Gostei da atenção aos detalhes e da forma como explicaram cada etapa. Saí satisfeita com o resultado.',
    praisedQualities: ['Atendimento', 'Qualidade']
  }
];
