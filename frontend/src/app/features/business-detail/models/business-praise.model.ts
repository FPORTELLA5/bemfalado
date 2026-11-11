export interface BusinessPraise {
  readonly id: string;
  readonly businessId: string;
  readonly authorDisplayName: string;
  readonly publishedAt: string;
  readonly title: string;
  readonly content: string;
  readonly praisedQualities: readonly string[];
}
