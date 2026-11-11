import type { UserNotification } from '../models/notification.model';

/** Dados ilustrativos; notificações reais serão entregues pelo backend. */
export const MOCK_NOTIFICATIONS: readonly UserNotification[] = [
  {
    id: 'notification-001',
    type: 'praise-published',
    title: 'Seu elogio foi publicado',
    message: 'Seu relato sobre o Café Aurora já está disponível no perfil do estabelecimento.',
    createdAt: '2026-11-11T14:20:00-03:00',
    read: false,
    actionLabel: 'Ver elogio',
    actionRoute: '/negocio/mock-001'
  },
  {
    id: 'notification-002',
    type: 'praise-useful',
    title: 'Seu elogio ajudou outras pessoas',
    message: 'Seu elogio sobre a Clínica Horizonte recebeu novas marcações como útil.',
    createdAt: '2026-11-10T10:15:00-03:00',
    read: false,
    actionLabel: 'Ver estabelecimento',
    actionRoute: '/negocio/mock-003'
  },
  {
    id: 'notification-003',
    type: 'favorite-update',
    title: 'Sua lista está organizada',
    message: 'Você pode consultar e gerenciar todos os estabelecimentos que salvou na área de favoritos.',
    createdAt: '2026-11-08T09:00:00-03:00',
    read: true,
    actionLabel: 'Ver favoritos',
    actionRoute: '/favoritos'
  },
  {
    id: 'notification-004',
    type: 'account',
    title: 'Complete seu perfil',
    message: 'Adicione uma breve apresentação para deixar seu espaço na comunidade mais completo.',
    createdAt: '2026-11-05T16:40:00-03:00',
    read: true,
    actionLabel: 'Editar perfil',
    actionRoute: '/minha-conta'
  }
];
