export interface UserProfile {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly memberSince: string;
  readonly city: string;
  readonly state: string;
  readonly bio: string;
}

export interface UserPraiseSummary {
  readonly id: string;
  readonly businessId: string;
  readonly businessName: string;
  readonly businessCategory: string;
  readonly publishedAt: string;
  readonly title: string;
  readonly excerpt: string;
  readonly praisedQualities: readonly string[];
}

export interface PrivateExperienceSummary {
  readonly id: string;
  readonly businessName: string;
  readonly businessCategory: string;
  readonly recordedAt: string;
}

export interface ModeratedPraiseNotice {
  readonly id: string;
  readonly businessName: string;
  readonly title: string;
  readonly status: 'hidden' | 'removed';
  readonly decisionNote: string;
  readonly decidedAt: string;
}
