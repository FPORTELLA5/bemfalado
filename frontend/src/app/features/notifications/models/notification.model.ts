export type NotificationType = 'praise-published' | 'praise-useful' | 'favorite-update' | 'account' | 'moderation-update';

export interface UserNotification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly createdAt: string;
  readonly read: boolean;
  readonly actionLabel?: string;
  readonly actionRoute?: string;
}

export type NotificationFilter = 'all' | 'unread';
