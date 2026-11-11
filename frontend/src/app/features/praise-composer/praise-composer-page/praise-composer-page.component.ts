import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';

type ComposerStep = 1 | 2 | 3 | 4;
type TextField = 'title' | 'content';

@Component({
  selector: 'bf-praise-composer-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './praise-composer-page.component.html',
  styleUrl: './praise-composer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PraiseComposerPageComponent {
  readonly step = signal<ComposerStep>(1);
  readonly businesses: readonly BusinessResult[] = MOCK_BUSINESS_RESULTS;
  readonly selectedBusinessId = signal<string>('');
  readonly selectedQualities = signal<readonly string[]>([]);
  readonly title = signal<string>('');
  readonly content = signal<string>('');
  readonly isFinished = signal<boolean>(false);

  readonly selectedBusiness = computed<BusinessResult | undefined>(() => (
    this.businesses.find((business: BusinessResult) => business.id === this.selectedBusinessId())
  ));

  readonly canContinue = computed<boolean>(() => {
    switch (this.step()) {
      case 1:
        return this.selectedBusinessId().length > 0;
      case 2:
        return this.selectedQualities().length > 0;
      case 3:
        return this.title().trim().length >= 5 && this.content().trim().length >= 30;
      case 4:
        return true;
    }
  });

  onBusinessSelect(businessId: string): void {
    this.selectedBusinessId.set(businessId);
  }

  toggleQuality(quality: string): void {
    this.selectedQualities.update((current: readonly string[]) => (
      current.includes(quality)
        ? current.filter((item: string) => item !== quality)
        : [...current, quality]
    ));
  }

  onTextInput(event: Event, field: TextField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return;

    if (field === 'title') {
      this.title.set(target.value);
      return;
    }

    this.content.set(target.value);
  }

  nextStep(): void {
    if (!this.canContinue() || this.step() === 4) return;
    switch (this.step()) {
      case 1:
        this.step.set(2);
        break;
      case 2:
        this.step.set(3);
        break;
      case 3:
        this.step.set(4);
        break;
      case 4:
        break;
    }
  }

  previousStep(): void {
    if (this.step() === 1) return;
    switch (this.step()) {
      case 1:
        break;
      case 2:
        this.step.set(1);
        break;
      case 3:
        this.step.set(2);
        break;
      case 4:
        this.step.set(3);
        break;
    }
  }

  finishDemo(): void {
    if (this.step() !== 4) return;
    this.isFinished.set(true);
  }
}
