import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { BusinessSortOption, BusinessResult } from '../models/business-result.model';
import { MOCK_BUSINESS_RESULTS } from '../data/mock-business-results';

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

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });

  readonly term = computed<string>(() => this.queryParams().get('q') ?? '');
  readonly location = computed<string>(() => this.queryParams().get('location') ?? '');
  readonly category = computed<string>(() => this.queryParams().get('category') ?? '');
  readonly sortOption = signal<BusinessSortOption>('most-praised');

  readonly results = computed<readonly BusinessResult[]>(() => {
    const normalizedTerm = this.normalizeSearchTerm(this.term());
    const normalizedLocation = this.normalizeSearchTerm(this.location());
    const normalizedCategory = this.normalizeSearchTerm(this.category());

    const filteredResults = MOCK_BUSINESS_RESULTS.filter((business: BusinessResult) => {
      const searchableText = this.normalizeSearchTerm([
        business.name,
        business.category,
        business.description,
        business.neighborhood,
        business.city
      ].join(' '));

      const matchesTerm = !normalizedTerm || searchableText.includes(normalizedTerm);
      const businessLocation = this.normalizeSearchTerm(
        `${business.neighborhood} ${business.city}`
      );
      const matchesLocation = !normalizedLocation || businessLocation.includes(normalizedLocation);
      const matchesCategory = !normalizedCategory
        || this.normalizeSearchTerm(business.category) === normalizedCategory;

      return matchesTerm && matchesLocation && matchesCategory;
    });

    return [...filteredResults].sort((first: BusinessResult, second: BusinessResult) => (
      this.sortOption() === 'recognition'
        ? second.recognitionIndex - first.recognitionIndex
        : second.praiseCount - first.praiseCount
    ));
  });

  onSortChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;

    const value = target.value;
    if (value === 'most-praised' || value === 'recognition') {
      this.sortOption.set(value);
    }
  }

  private normalizeSearchTerm(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLocaleLowerCase('pt-BR');
  }
}
