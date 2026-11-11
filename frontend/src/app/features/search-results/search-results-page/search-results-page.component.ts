import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bf-search-results-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly term = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  readonly location = signal(this.route.snapshot.queryParamMap.get('location') ?? '');
  readonly category = signal(this.route.snapshot.queryParamMap.get('category') ?? '');
}
