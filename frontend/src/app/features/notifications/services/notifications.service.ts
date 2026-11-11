import { Injectable, computed, signal } from '@angular/core';
import { MOCK_NOTIFICATIONS } from '../data/mock-notifications';
import type { UserNotification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly notificationItems = signal<readonly UserNotification[]>(MOCK_NOTIFICATIONS);

  readonly notifications = computed<readonly UserNotification[]>(() => (
    [...this.notificationItems()].sort((first: UserNotification, second: UserNotification) => (
      second.createdAt.localeCompare(first.createdAt)
    ))
  ));

  readonly unreadCount = computed<number>(() => (
    this.notificationItems().filter((notification: UserNotification) => !notification.read).length
  ));

  markAsRead(notificationId: string): void {
    this.notificationItems.update((current: readonly UserNotification[]) => (
      current.map((notification: UserNotification) => (
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      ))
    ));
  }

  markAllAsRead(): void {
    this.notificationItems.update((current: readonly UserNotification[]) => (
      current.map((notification: UserNotification) => ({ ...notification, read: true }))
    ));
  }
}
