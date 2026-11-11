import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private readonly router = inject(Router);

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });

  readonly term = computed<string>(() => this.queryParams().get('q') ?? '');
  readonly location = computed<string>(() => this.queryParams().get('location') ?? '');
  readonly category = computed<string>(() => this.queryParams().get('category') ?? '');
  readonly sortOption = signal<BusinessSortOption>('most-praised');
  readonly filterLocation = signal<string>(this.location());
  readonly filterCategory = signal<string>(this.category());

  readonly categories: readonly string[] = [
    'Alimentação',
    'Saúde e bem-estar',
    'Beleza e estética',
    'Comércio e lojas',
    'Casa e construção',
    'Automóveis e transporte',
    'Educação',
    'Turismo e hospedagem',
    'Tecnologia',
    'Outros serviços'
  ];

  constructor() {
    effect(() => {
      this.filterLocation.set(this.location());
      this.filterCategory.set(this.category());
    });
  }

  readonly noResultsTitle = computed<string>(() => {
    if (this.term()) return 'Não encontramos esse negócio.';
    if (this.location() || this.category()) return 'Nenhum negócio corresponde a esses filtros.';
    return 'Ainda não há negócios para exibir.';
  });

  readonly noResultsDescription = computed<string>(() => {
    if (this.term()) {
      return 'Confira se o nome está correto ou limpe a busca para explorar todos os negócios disponíveis.';
    }
    if (this.location() || this.category()) {
      return 'Experimente ampliar a região ou escolher outra categoria.';
    }
    return 'Novos negócios e experiências serão exibidos aqui quando estiverem disponíveis.';
  });

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

  onLocationInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.filterLocation.set(target.value);
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.filterCategory.set(target.value);
    }
  }

  applyFilters(event: Event): void {
    event.preventDefault();

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.term() || null,
        location: this.filterLocation().trim() || null,
        category: this.filterCategory() || null
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters(): void {
    this.filterLocation.set('');
    this.filterCategory.set('');

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        location: null,
        category: null
      },
      queryParamsHandling: 'merge'
    });
  }

  clearSearch(): void {
    this.filterLocation.set('');
    this.filterCategory.set('');

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: null,
        location: null,
        category: null
      },
      queryParamsHandling: 'merge'
    });
  }

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
