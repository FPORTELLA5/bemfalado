import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bf-search-results-page',
  standalone: true,
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly term = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  readonly location = signal(this.route.snapshot.queryParamMap.get('location') ?? '');
  readonly category = signal(this.route.snapshot.queryParamMap.get('category') ?? '');

  readonly hasSearchCriteria = this.term().length > 0 || this.category().length > 0;
}
