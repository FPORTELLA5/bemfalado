import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ModerationFilter, ModerationQueueItem, ModerationStatus } from '../models/moderation-queue.model';
import { ModerationQueueService } from '../services/moderation-queue.service';
import { ModerationAppealsService } from '../services/moderation-appeals.service';
import { ModerationAuditService } from '../services/moderation-audit.service';
import type { ModerationAppeal } from '../models/moderation-appeal.model';

@Component({
  selector: 'bf-moderation-queue-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './moderation-queue-page.component.html',
  styleUrl: './moderation-queue-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModerationQueuePageComponent {
  readonly moderation = inject(ModerationQueueService);
  readonly appeals = inject(ModerationAppealsService);
  readonly audit = inject(ModerationAuditService);
  readonly selectedAppealId = signal<string | null>(null);
  readonly appealReviewNote = signal<string>('');
  readonly maxAppealReviewNoteLength = 500;
  readonly activeFilter = signal<ModerationFilter>('pending');
  readonly selectedReportId = signal<string | null>(null);
  readonly decisionNote = signal<string>('');
  readonly maxDecisionNoteLength = 500;

  readonly filteredItems = computed<readonly ModerationQueueItem[]>(() => {
    const items = this.moderation.queue();
    const filter = this.activeFilter();

    if (filter === 'pending') {
      return items.filter((item) => item.status === 'pending');
    }

    if (filter === 'decided') {
      return items.filter((item) => item.status !== 'pending');
    }

    return items;
  });

  readonly selectedItem = computed<ModerationQueueItem | undefined>(() => {
    const items = this.filteredItems();
    const selectedId = this.selectedReportId();

    return items.find((item) => item.id === selectedId) ?? items[0];
  });

  readonly selectedAppeal = computed<ModerationAppeal | undefined>(() => {
    const items = this.appeals.appeals();
    const selectedId = this.selectedAppealId();
    return items.find((item) => item.id === selectedId) ?? items[0];
  });

  selectAppeal(appealId: string): void {
    this.selectedAppealId.set(appealId);
    this.appealReviewNote.set('');
  }

  onAppealReviewNoteInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLTextAreaElement) {
      this.appealReviewNote.set(target.value.slice(0, this.maxAppealReviewNoteLength));
    }
  }

  decideAppeal(status: 'accepted' | 'rejected'): void {
    const selected = this.selectedAppeal();
    const note = this.appealReviewNote().trim();

    if (!selected || selected.status !== 'pending' || note.length < 10) {
      return;
    }

    this.appeals.decide({
      appealId: selected.id,
      status,
      reviewNote: note
    });
    this.appealReviewNote.set('');
  }

  appealStatusLabel(status: ModerationAppeal['status']): string {
    switch (status) {
      case 'pending': return 'Aguardando revisão';
      case 'accepted': return 'Contestação aceita';
      case 'rejected': return 'Contestação não aceita';
    }
  }

  setFilter(filter: ModerationFilter): void {
    this.activeFilter.set(filter);
    this.selectedReportId.set(null);
    this.decisionNote.set('');
  }

  selectReport(reportId: string): void {
    this.selectedReportId.set(reportId);
    this.decisionNote.set('');
  }

  onDecisionNoteInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLTextAreaElement) {
      this.decisionNote.set(target.value.slice(0, this.maxDecisionNoteLength));
    }
  }

  decide(status: Exclude<ModerationStatus, 'pending'>): void {
    const selected = this.selectedItem();
    const note = this.decisionNote().trim();

    if (!selected || selected.status !== 'pending' || note.length < 10) {
      return;
    }

    this.moderation.decide({
      reportId: selected.id,
      status,
      decisionNote: note
    });
    this.decisionNote.set('');
    this.activeFilter.set('decided');
    this.selectedReportId.set(selected.id);
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
