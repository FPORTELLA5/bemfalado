import type { PraiseReportReason } from '../../business-detail/models/praise-report.model';

export type ModerationStatus = 'pending' | 'maintained' | 'hidden' | 'removed';
export type ModerationPriority = 'normal' | 'high' | 'urgent';
export type ModerationFilter = 'all' | 'pending' | 'decided';

export interface ModerationQueueItem {
  readonly id: string;
  readonly praiseId: string;
  readonly businessName: string;
  readonly praiseAuthor: string;
  readonly praiseTitle: string;
  readonly praiseContent: string;
  readonly reason: PraiseReportReason;
  readonly details: string;
  readonly reportedAt: string;
  readonly priority: ModerationPriority;
  readonly status: ModerationStatus;
  readonly decisionNote: string | null;
  readonly decidedAt: string | null;
  readonly decidedBy: string | null;
}

export interface ModerationDecisionInput {
  readonly reportId: string;
  readonly status: Exclude<ModerationStatus, 'pending'>;
  readonly decisionNote: string;
}
