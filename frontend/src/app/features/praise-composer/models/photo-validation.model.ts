export type PhotoValidationIssueCode =
  | 'unsupported-format'
  | 'file-too-large'
  | 'invalid-signature'
  | 'invalid-image'
  | 'excessive-dimensions';

export type PhotoValidationResult =
  | { readonly valid: true }
  | {
      readonly valid: false;
      readonly code: PhotoValidationIssueCode;
      readonly message: string;
    };
