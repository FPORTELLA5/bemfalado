import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import type { SearchCriteria } from '../../../shared/models/search-criteria.type';

@Component({
  selector: 'bf-hero-search',
  standalone: true,
  templateUrl: './hero-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent {
  readonly searchRequested = output<SearchCriteria>();
  readonly searchTerm = signal('');
  readonly locationTerm = signal('');
  readonly searchFeedback = signal('');

  onSearchTermInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchTerm.set(target.value);
      this.searchFeedback.set('');
    }
  }

  onLocationInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.locationTerm.set(target.value);
    }
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const term = this.searchTerm().trim();
    if (!term) {
      this.searchFeedback.set('Digite o nome de um lugar, empresa ou serviço para começar.');
      return;
    }
    this.searchFeedback.set('Abrindo resultados...');
    this.searchRequested.emit({ term, location: this.locationTerm().trim() });
  }
}
