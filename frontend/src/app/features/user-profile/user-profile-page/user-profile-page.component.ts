import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FocusOnRenderDirective } from '../../../shared/directives/focus-on-render.directive';
import { MOCK_MODERATED_PRAISE, MOCK_PRIVATE_EXPERIENCES, MOCK_USER_PRAISES, MOCK_USER_PROFILE } from '../data/mock-user-profile';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { ModerationAppealsService } from '../../moderation/services/moderation-appeals.service';
import type { ModeratedPraiseNotice, UserProfile } from '../models/user-profile.model';

type ProfileSection = 'overview' | 'praises' | 'private' | 'account';
type ProfileField = 'displayName' | 'city' | 'bio';

@Component({
  selector: 'bf-user-profile-page',
  standalone: true,
  imports: [RouterLink, FocusOnRenderDirective],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfilePageComponent {
  readonly notifications = inject(NotificationsService);
  readonly appeals = inject(ModerationAppealsService);
  readonly moderatedPraise: ModeratedPraiseNotice = MOCK_MODERATED_PRAISE;
  readonly appealJustification = signal<string>('');
  readonly appealSubmittedNotice = signal<boolean>(false);
  readonly maxAppealLength = 1000;
  readonly existingAppeal = computed(() => this.appeals.findByPraiseId(this.moderatedPraise.id));
  readonly activeSection = signal<ProfileSection>('overview');
  readonly profile = signal<UserProfile>(MOCK_USER_PROFILE);
  private savedProfile: UserProfile = MOCK_USER_PROFILE;
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

  onAppealJustificationInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLTextAreaElement) {
      this.appealJustification.set(target.value.slice(0, this.maxAppealLength));
      this.appealSubmittedNotice.set(false);
    }
  }

  submitAppeal(): void {
    const submitted = this.appeals.submit({
      praiseId: this.moderatedPraise.id,
      decisionId: this.moderatedPraise.decisionId,
      businessName: this.moderatedPraise.businessName,
      praiseTitle: this.moderatedPraise.title,
      authorName: this.profile().displayName,
      originalStatus: this.moderatedPraise.status,
      originalDecisionNote: this.moderatedPraise.decisionNote,
      justification: this.appealJustification()
    });

    if (submitted) {
      this.appealJustification.set('');
      this.appealSubmittedNotice.set(true);
    }
  }

  setSection(section: ProfileSection): void {
    if (this.activeSection() === section) return;
    if (this.isEditing()) {
      this.cancelEditing();
    }
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

  editProfile(): void {
    this.setSection('account');
    this.startEditing();
  }

  startEditing(): void {
    this.isEditing.set(true);
    this.profileSavedNotice.set(false);
  }

  saveProfileDemo(): void {
    if (!this.isEditing()) return;
    const current = this.profile();
    const displayName = current.displayName.trim();
    if (!displayName) return;
    this.savedProfile = { ...current, displayName };
    this.profile.set(this.savedProfile);
    this.isEditing.set(false);
    this.profileSavedNotice.set(true);
  }

  cancelEditing(): void {
    this.profile.set(this.savedProfile);
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
