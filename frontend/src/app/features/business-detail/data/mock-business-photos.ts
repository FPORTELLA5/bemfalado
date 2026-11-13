import type { BusinessPhoto } from '../models/business-photo.model';

const photoPath = 'assets/estabelecimentos/';

export const MOCK_BUSINESS_PHOTOS: Readonly<Partial<Record<string, readonly BusinessPhoto[]>>> = {
  'mock-001': [
    {
      src: photoPath + 'cafe-interior.webp',
      description: 'Interior de uma cafeteria com luminárias suspensas e letreiro'
    },
    {
      src: photoPath + 'cafe-balcao.webp',
      description: 'Café sendo preparado no balcão com um filtro de papel'
    },
    {
      src: photoPath + 'cafe-cappuccino.webp',
      description: 'Xícaras de cappuccino cercadas por plantas'
    }
  ],
  'mock-002': [
    {
      src: photoPath + 'loja.webp',
      description: 'Loja de decoração com mesas e cadeiras expostas'
    }
  ],
  'mock-003': [
    {
      src: photoPath + 'clinica.webp',
      description: 'Sala de espera com três cadeiras vermelhas junto à janela'
    }
  ],
  'mock-004': [
    {
      src: photoPath + 'salao.webp',
      description: 'Salão de beleza com espelhos em arco e cadeiras de atendimento'
    }
  ]
};
