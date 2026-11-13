import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { SearchCriteria } from '../../../shared/models/search-criteria.type';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { CategoryGridComponent } from '../category-grid/category-grid.component';
import { CommunityCtaComponent } from '../community-cta/community-cta.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'bf-home-page',
  standalone: true,
  imports: [
    RouterLink,
    HeroSearchComponent,
    CategoryGridComponent,
    HowItWorksComponent,
    CommunityCtaComponent
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly router = inject(Router);

  readonly featuredBusinesses: readonly BusinessResult[] = MOCK_BUSINESS_RESULTS.slice(0, 3);

  onSearch(criteria: SearchCriteria): void {
    void this.router.navigate(['/buscar'], {
      queryParams: {
        q: criteria.term,
        location: criteria.location || null
      }
    });
  }

  onCategorySelected(category: string): void {
    void this.router.navigate(['/buscar'], {
      queryParams: { category }
    });
  }
}
