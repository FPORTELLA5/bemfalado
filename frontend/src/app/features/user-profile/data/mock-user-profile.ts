import type { PrivateExperienceSummary, UserPraiseSummary, UserProfile } from '../models/user-profile.model';

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-demo-001',
  displayName: 'Marina Costa',
  email: 'marina.costa@example.com',
  memberSince: '2026-03-12',
  city: 'Rio de Janeiro',
  state: 'RJ',
  bio: 'Gosto de descobrir bons lugares e compartilhar experiências que podem ajudar outras pessoas.'
};

export const MOCK_USER_PRAISES: readonly UserPraiseSummary[] = [
  {
    id: 'user-praise-001',
    businessId: 'mock-001',
    businessName: 'Café Aurora',
    businessCategory: 'Alimentação e bebidas',
    publishedAt: '2026-10-28',
    title: 'Um atendimento que faz a diferença',
    excerpt: 'Ambiente agradável, café muito bem preparado e uma equipe atenciosa do início ao fim.',
    praisedQualities: ['Atendimento', 'Qualidade dos produtos']
  },
  {
    id: 'user-praise-002',
    businessId: 'mock-003',
    businessName: 'Clínica Horizonte',
    businessCategory: 'Saúde e bem-estar',
    publishedAt: '2026-09-16',
    title: 'Cuidado e organização em cada etapa',
    excerpt: 'Fui recebida com atenção, as orientações foram claras e o espaço estava muito organizado.',
    praisedQualities: ['Acolhimento', 'Organização']
  },
  {
    id: 'user-praise-003',
    businessId: 'mock-002',
    businessName: 'Casa Ipê Decoração',
    businessCategory: 'Comércio e lojas',
    publishedAt: '2026-08-03',
    title: 'Ótima experiência de compra',
    excerpt: 'Encontrei boas opções e recebi meu pedido dentro do prazo combinado.',
    praisedQualities: ['Variedade', 'Entrega']
  }
];

export const MOCK_PRIVATE_EXPERIENCES: readonly PrivateExperienceSummary[] = [
  {
    id: 'private-experience-001',
    businessName: 'Ateliê Ponto de Luz',
    businessCategory: 'Beleza e estética',
    recordedAt: '2026-10-11'
  },
  {
    id: 'private-experience-002',
    businessName: 'Mercado do Bairro',
    businessCategory: 'Comércio e lojas',
    recordedAt: '2026-07-22'
  }
];
