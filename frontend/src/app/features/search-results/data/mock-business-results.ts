import type { BusinessResult } from '../models/business-result.model';

/**
 * Dados fictícios para desenvolvimento visual.
 * Substituir por resposta da API quando o backend estiver integrado.
 */
export const MOCK_BUSINESS_RESULTS: readonly BusinessResult[] = [
  {
    id: 'mock-001',
    name: 'Café Aurora',
    category: 'Alimentação',
    description: 'Cafeteria de bairro com atendimento atencioso e opções artesanais.',
    neighborhood: 'Tijuca',
    city: 'Rio de Janeiro',
    praiseCount: 128,
    experienceCount: 140,
    recognitionIndex: 91,
    praisedQualities: ['Atendimento', 'Qualidade dos produtos'],
    initials: 'CA',
    accent: 'terracotta'
  },
  {
    id: 'mock-002',
    name: 'Casa Ipê Decoração',
    category: 'Comércio e lojas',
    description: 'Loja de decoração com variedade, cuidado nos detalhes e entrega ágil.',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    praiseCount: 96,
    experienceCount: 110,
    recognitionIndex: 87,
    praisedQualities: ['Variedade', 'Entrega'],
    initials: 'CI',
    accent: 'blue'
  },
  {
    id: 'mock-003',
    name: 'Clínica Horizonte',
    category: 'Saúde e bem-estar',
    description: 'Espaço de saúde com equipe acolhedora e comunicação clara.',
    neighborhood: 'Recreio dos Bandeirantes',
    city: 'Rio de Janeiro',
    praiseCount: 84,
    experienceCount: 90,
    recognitionIndex: 93,
    praisedQualities: ['Acolhimento', 'Organização'],
    initials: 'CH',
    accent: 'green'
  },
  {
    id: 'mock-004',
    name: 'Ateliê Ponto de Luz',
    category: 'Beleza e estética',
    description: 'Atendimento cuidadoso e ambiente pensado para o bem-estar.',
    neighborhood: 'Campo Grande',
    city: 'Rio de Janeiro',
    praiseCount: 63,
    experienceCount: 75,
    recognitionIndex: 84,
    praisedQualities: ['Cuidado', 'Ambiente'],
    initials: 'PL',
    accent: 'purple'
  }
];
