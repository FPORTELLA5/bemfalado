import { Injectable, computed, inject, signal } from '@angular/core';
import { NotificationsService } from '../../notifications/services/notifications.service';
import type {
  CreateModerationAppealInput,
  DecideModerationAppealInput,
  ModerationAppeal
} from '../models/moderation-appeal.model';

@Injectable({ providedIn: 'root' })
export class ModerationAppealsService {
  private readonly notifications = inject(NotificationsService);
  private readonly appealRecords = signal<readonly ModerationAppeal[]>([]);
  readonly appeals = this.appealRecords.asReadonly();
  readonly pendingCount = computed<number>(() => (
    this.appealRecords().filter((appeal) => appeal.status === 'pending').length
  ));

  submit(input: CreateModerationAppealInput): boolean {
    const alreadySubmitted = this.appealRecords().some((appeal) => appeal.decisionId === input.decisionId);
    const justification = input.justification.trim();

    if (alreadySubmitted || justification.length < 20 || justification.length > 1000) {
      return false;
    }

    const appeal: ModerationAppeal = {
      ...input,
      id: `appeal-${Date.now()}`,
      justification,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      reviewNote: null,
      reviewedAt: null
    };

    this.appealRecords.update((current) => [appeal, ...current]);
    this.notifications.addNotification({
      type: 'moderation-update',
      title: 'Contestação recebida',
      message: 'Sua solicitação de revisão foi registrada e está aguardando análise.',
      actionLabel: 'Acompanhar solicitação',
      actionRoute: '/minha-conta'
    });
    return true;
  }

  decide(input: DecideModerationAppealInput): void {
    const reviewNote = input.reviewNote.trim();

    if (reviewNote.length < 10) {
      return;
    }

    const reviewedAppeal = this.appealRecords().find((appeal) => appeal.id === input.appealId);
    this.appealRecords.update((current) => current.map((appeal) => (
      appeal.id === input.appealId && appeal.status === 'pending'
        ? {
            ...appeal,
            status: input.status,
            reviewNote,
            reviewedAt: new Date().toISOString()
          }
        : appeal
    )));
    if (reviewedAppeal?.status === 'pending') {
      this.notifications.addNotification({
        type: 'moderation-update',
        title: input.status === 'accepted' ? 'Contestação aceita' : 'Revisão concluída',
        message: input.status === 'accepted'
          ? 'Sua contestação foi aceita. Consulte o status atualizado na sua conta.'
          : 'A equipe concluiu a revisão da sua contestação. Consulte o retorno na sua conta.',
        actionLabel: 'Ver retorno',
        actionRoute: '/minha-conta'
      });
    }
  }

  findByPraiseId(praiseId: string): ModerationAppeal | undefined {
    return this.appealRecords().find((appeal) => appeal.praiseId === praiseId);
  }
}
