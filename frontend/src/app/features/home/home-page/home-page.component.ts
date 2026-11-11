import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { SearchCriteria } from '../../../shared/models/search-criteria.type';
import { CategoryGridComponent } from '../category-grid/category-grid.component';
import { CommunityCtaComponent } from '../community-cta/community-cta.component';
import { DiscoverySectionComponent } from '../discovery-section/discovery-section.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'bf-home-page',
  standalone: true,
  imports: [
    HeroSearchComponent,
    CategoryGridComponent,
    DiscoverySectionComponent,
    HowItWorksComponent,
    CommunityCtaComponent
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly router = inject(Router);

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
