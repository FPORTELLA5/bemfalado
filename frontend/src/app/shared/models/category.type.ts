export type CategoryIcon =
  | 'utensils'
  | 'heart'
  | 'sparkles'
  | 'shopping-bag'
  | 'house'
  | 'car'
  | 'graduation-cap'
  | 'compass'
  | 'monitor'
  | 'grid';

export interface CategoryItem {
  readonly name: string;
  readonly icon: CategoryIcon;
  readonly description: string;
}
