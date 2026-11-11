import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import type { NotificationFilter, NotificationType, UserNotification } from '../models/notification.model';

@Component({
  selector: 'bf-notifications-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPageComponent {
  readonly notificationService = inject(NotificationsService);
  readonly activeFilter = signal<NotificationFilter>('all');

  readonly filteredNotifications = computed<readonly UserNotification[]>(() => {
    const items = this.notificationService.notifications();
    return this.activeFilter() === 'unread'
      ? items.filter((notification: UserNotification) => !notification.read)
      : items;
  });

  setFilter(filter: NotificationFilter): void {
    this.activeFilter.set(filter);
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  iconFor(type: NotificationType): string {
    switch (type) {
      case 'praise-published': return '♡';
      case 'praise-useful': return '✳';
      case 'favorite-update': return '⌑';
      case 'account': return '○';
    }
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
}
