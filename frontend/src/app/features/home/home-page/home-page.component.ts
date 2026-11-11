import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryGridComponent } from '../category-grid/category-grid.component';
import { CommunityCtaComponent } from '../community-cta/community-cta.component';
import { DiscoverySectionComponent } from '../discovery-section/discovery-section.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

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
export class HomePageComponent {}
