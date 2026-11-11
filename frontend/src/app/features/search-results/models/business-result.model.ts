export type BusinessSortOption = 'most-praised' | 'recognition';

export interface BusinessResult {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly praiseCount: number;
  readonly experienceCount: number;
  readonly recognitionIndex: number;
  readonly praisedQualities: readonly string[];
  readonly initials: string;
  readonly accent: 'blue' | 'terracotta' | 'green' | 'purple';
}
