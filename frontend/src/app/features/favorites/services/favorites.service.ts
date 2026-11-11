import { Injectable, computed, signal } from '@angular/core';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';

/**
 * Estado temporário de favoritos para demonstração.
 * Na integração, a lista será carregada e persistida pela API do usuário autenticado.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoriteIds = signal<readonly string[]>(['mock-001', 'mock-003']);

  readonly businesses = computed<readonly BusinessResult[]>(() => {
    const savedIds = new Set(this.favoriteIds());
    return MOCK_BUSINESS_RESULTS.filter((business: BusinessResult) => savedIds.has(business.id));
  });

  readonly count = computed<number>(() => this.favoriteIds().length);

  isFavorite(businessId: string): boolean {
    return this.favoriteIds().includes(businessId);
  }

  toggle(businessId: string): void {
    this.favoriteIds.update((current: readonly string[]) => (
      current.includes(businessId)
        ? current.filter((id: string) => id !== businessId)
        : [...current, businessId]
    ));
  }

  remove(businessId: string): void {
    this.favoriteIds.update((current: readonly string[]) => (
      current.filter((id: string) => id !== businessId)
    ));
  }
}
