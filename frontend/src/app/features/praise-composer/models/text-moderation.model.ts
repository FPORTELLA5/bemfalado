export type TextModerationStatus = 'allowed' | 'correction' | 'blocked';

export type TextModerationIssueCode =
  | 'external-link'
  | 'personal-data'
  | 'negative-experience'
  | 'abusive-language'
  | 'threat'
  | 'excessive-repetition';

export interface TextModerationIssue {
  readonly code: TextModerationIssueCode;
  readonly status: Exclude<TextModerationStatus, 'allowed'>;
  readonly message: string;
}

export interface TextModerationResult {
  readonly status: TextModerationStatus;
  readonly issues: readonly TextModerationIssue[];
  readonly message: string;
}
