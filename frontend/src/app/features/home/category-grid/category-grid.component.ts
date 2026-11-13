import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../../shared/data/categories';

@Component({
  selector: 'bf-category-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
  readonly categories = CATEGORIES;
}
