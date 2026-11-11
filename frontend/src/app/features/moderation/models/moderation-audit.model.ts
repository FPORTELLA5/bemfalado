export type ModerationAuditAction =
  | 'report-received'
  | 'report-decision'
  | 'appeal-submitted'
  | 'appeal-decision';

export type ModerationAuditEntityType = 'report' | 'appeal';

export interface ModerationAuditEntry {
  readonly id: string;
  readonly entityType: ModerationAuditEntityType;
  readonly entityId: string;
  readonly praiseId: string;
  readonly action: ModerationAuditAction;
  readonly actorId: string;
  readonly actorLabel: string;
  readonly occurredAt: string;
  readonly previousState: string | null;
  readonly newState: string;
  readonly justification: string;
  readonly summary: string;
}

export interface CreateModerationAuditEntryInput {
  readonly entityType: ModerationAuditEntityType;
  readonly entityId: string;
  readonly praiseId: string;
  readonly action: ModerationAuditAction;
  readonly actorId: string;
  readonly actorLabel: string;
  readonly previousState: string | null;
  readonly newState: string;
  readonly justification: string;
  readonly summary: string;
}
