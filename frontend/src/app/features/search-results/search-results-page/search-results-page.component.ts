import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

  readonly term = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  readonly location = signal(this.route.snapshot.queryParamMap.get('location') ?? '');
  readonly category = signal(this.route.snapshot.queryParamMap.get('category') ?? '');
  readonly sortOption = signal<BusinessSortOption>('most-praised');

  readonly results = computed<readonly BusinessResult[]>(() => {
    const normalizedTerm = this.term().trim().toLocaleLowerCase('pt-BR');
    const normalizedLocation = this.location().trim().toLocaleLowerCase('pt-BR');
    const normalizedCategory = this.category().trim().toLocaleLowerCase('pt-BR');

    const filteredResults = MOCK_BUSINESS_RESULTS.filter((business: BusinessResult) => {
      const searchableText = [
        business.name,
        business.category,
        business.description,
        business.neighborhood,
        business.city
      ].join(' ').toLocaleLowerCase('pt-BR');

      const matchesTerm = !normalizedTerm || searchableText.includes(normalizedTerm);
      const businessLocation = `${business.neighborhood} ${business.city}`.toLocaleLowerCase('pt-BR');
      const matchesLocation = !normalizedLocation || businessLocation.includes(normalizedLocation);
      const matchesCategory = !normalizedCategory
        || business.category.toLocaleLowerCase('pt-BR') === normalizedCategory;

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
}
