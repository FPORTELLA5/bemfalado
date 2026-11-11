export type PraiseReportReason =
  | 'unrelated-experience'
  | 'misleading-information'
  | 'personal-data'
  | 'offensive-content'
  | 'spam-manipulation'
  | 'third-party-rights'
  | 'other';

export interface PraiseReportReasonOption {
  readonly value: PraiseReportReason;
  readonly label: string;
}

export interface CreatePraiseReportInput {
  readonly praiseId: string;
  readonly reason: PraiseReportReason;
  readonly details: string;
}

export interface PraiseReport {
  readonly id: string;
  readonly praiseId: string;
  readonly reason: PraiseReportReason;
  readonly details: string;
  readonly submittedAt: string;
}

export const PRAISE_REPORT_REASONS: readonly PraiseReportReasonOption[] = [
  { value: 'unrelated-experience', label: 'Não parece relatar uma experiência real' },
  { value: 'misleading-information', label: 'Possível informação falsa ou enganosa' },
  { value: 'personal-data', label: 'Exposição de dados pessoais ou conteúdo privado' },
  { value: 'offensive-content', label: 'Linguagem ofensiva, discriminatória ou ameaçadora' },
  { value: 'spam-manipulation', label: 'Suspeita de spam, manipulação ou fraude' },
  { value: 'third-party-rights', label: 'Uso indevido de imagem ou conteúdo de terceiros' },
  { value: 'other', label: 'Outro motivo relacionado às regras da comunidade' }
];
