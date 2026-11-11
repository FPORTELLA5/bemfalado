export type ModerationAppealStatus = 'pending' | 'accepted' | 'rejected';

export interface ModerationAppeal {
  readonly id: string;
  readonly praiseId: string;
  readonly decisionId: string;
  readonly businessName: string;
  readonly praiseTitle: string;
  readonly authorName: string;
  readonly originalStatus: 'hidden' | 'removed';
  readonly originalDecisionNote: string;
  readonly justification: string;
  readonly submittedAt: string;
  readonly status: ModerationAppealStatus;
  readonly reviewNote: string | null;
  readonly reviewedAt: string | null;
}

export interface CreateModerationAppealInput {
  readonly praiseId: string;
  readonly businessName: string;
  readonly praiseTitle: string;
  readonly authorName: string;
  readonly originalStatus: 'hidden' | 'removed';
  readonly originalDecisionNote: string;
  readonly justification: string;
}

export interface DecideModerationAppealInput {
  readonly appealId: string;
  readonly status: Exclude<ModerationAppealStatus, 'pending'>;
  readonly reviewNote: string;
}
