import { Injectable, computed, signal } from '@angular/core';
import type {
  CreateModerationAppealInput,
  DecideModerationAppealInput,
  ModerationAppeal
} from '../models/moderation-appeal.model';

@Injectable({ providedIn: 'root' })
export class ModerationAppealsService {
  private readonly appealRecords = signal<readonly ModerationAppeal[]>([]);
  readonly appeals = this.appealRecords.asReadonly();
  readonly pendingCount = computed<number>(() => (
    this.appealRecords().filter((appeal) => appeal.status === 'pending').length
  ));

  submit(input: CreateModerationAppealInput): boolean {
    const alreadySubmitted = this.appealRecords().some((appeal) => appeal.praiseId === input.praiseId);
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
    return true;
  }

  decide(input: DecideModerationAppealInput): void {
    const reviewNote = input.reviewNote.trim();

    if (reviewNote.length < 10) {
      return;
    }

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
  }

  findByPraiseId(praiseId: string): ModerationAppeal | undefined {
    return this.appealRecords().find((appeal) => appeal.praiseId === praiseId);
  }
}
