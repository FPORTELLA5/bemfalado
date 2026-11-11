export interface BusinessRequestDraft {
  readonly businessName: string;
  readonly category: string;
  readonly city: string;
  readonly neighborhood: string;
  readonly businessPhone: string;
  readonly businessEmail: string;
  readonly instagramProfile: string;
  readonly website: string;
}

export type BusinessRequestStatus =
  | 'pending_review'
  | 'contact_to_make'
  | 'contacted'
  | 'invited'
  | 'approved'
  | 'rejected';

export interface BusinessInclusionRequest extends BusinessRequestDraft {
  readonly id: string;
  readonly source: 'user_search';
  readonly status: BusinessRequestStatus;
  readonly createdAt: string;
}
