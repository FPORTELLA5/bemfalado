import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_PRIVATE_EXPERIENCES, MOCK_USER_PRAISES, MOCK_USER_PROFILE } from '../data/mock-user-profile';
import { NotificationsService } from '../../notifications/services/notifications.service';
import type { UserProfile } from '../models/user-profile.model';

type ProfileSection = 'overview' | 'praises' | 'private' | 'account';
type ProfileField = 'displayName' | 'city' | 'bio';

@Component({
  selector: 'bf-user-profile-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfilePageComponent {
  readonly notifications = new NotificationsService();
  readonly activeSection = signal<ProfileSection>('overview');
  readonly profile = signal<UserProfile>(MOCK_USER_PROFILE);
  readonly praises = MOCK_USER_PRAISES;
  readonly privateExperiences = MOCK_PRIVATE_EXPERIENCES;
  readonly isEditing = signal<boolean>(false);
  readonly profileSavedNotice = signal<boolean>(false);

  readonly initials = computed<string>(() => this.profile().displayName
    .split(' ')
    .filter((part: string) => part.length > 0)
    .slice(0, 2)
    .map((part: string) => part.charAt(0).toLocaleUpperCase('pt-BR'))
    .join(''));

  readonly publishedPraiseCount = computed<number>(() => this.praises.length);
  readonly privateExperienceCount = computed<number>(() => this.privateExperiences.length);

  setSection(section: ProfileSection): void {
    this.activeSection.set(section);
    this.isEditing.set(false);
    this.profileSavedNotice.set(false);
  }

  onProfileInput(event: Event, field: ProfileField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    this.profile.update((current: UserProfile) => {
      switch (field) {
        case 'displayName': return { ...current, displayName: target.value };
        case 'city': return { ...current, city: target.value };
        case 'bio': return { ...current, bio: target.value };
      }
    });
    this.profileSavedNotice.set(false);
  }

  startEditing(): void {
    this.isEditing.set(true);
    this.profileSavedNotice.set(false);
  }

  saveProfileDemo(): void {
    this.isEditing.set(false);
    this.profileSavedNotice.set(true);
  }

  cancelEditing(): void {
    this.profile.set(MOCK_USER_PROFILE);
    this.isEditing.set(false);
    this.profileSavedNotice.set(false);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(`${date}T12:00:00`));
  }
}
