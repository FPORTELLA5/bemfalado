import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';

export interface SearchCriteria {
  readonly term: string;
  readonly location: string;
}

@Component({
  selector: 'bf-hero-search',
  standalone: true,
  templateUrl: './hero-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent {
  @Output() readonly searchRequested = new EventEmitter<SearchCriteria>();
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
    this.searchFeedback.set('Busca preparada. A página de resultados será conectada na próxima etapa.');
    this.searchRequested.emit({ term, location: this.locationTerm().trim() });
  }
}
