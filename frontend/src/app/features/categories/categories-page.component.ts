import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FocusOnRenderDirective } from '../../shared/directives/focus-on-render.directive';
import { CATEGORIES } from '../../shared/data/categories';
import { MOCK_BUSINESS_RESULTS } from '../search-results/data/mock-business-results';

@Component({
  selector: 'bf-categories-page',
  standalone: true,
  imports: [RouterLink, FocusOnRenderDirective],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });

  readonly categories = CATEGORIES.map((category) => ({
    ...category,
    businesses: MOCK_BUSINESS_RESULTS.filter((business) => business.category === category.name)
  }));
  readonly allBusinesses = [...MOCK_BUSINESS_RESULTS].sort((first, second) => second.praiseCount - first.praiseCount);
  readonly selectedCategory = computed(() =>
    this.categories.find((category) => category.name === this.queryParams().get('category'))
  );
  readonly businesses = computed(() => this.selectedCategory()?.businesses ?? this.allBusinesses);

  selectCategory(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: target.value || null }
      });
    }
  }
}
