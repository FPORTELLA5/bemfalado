import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { BusinessPraise } from '../models/business-praise.model';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { MOCK_BUSINESS_PRAISES } from '../data/mock-business-praises';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';

@Component({
  selector: 'bf-business-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './business-detail-page.component.html',
  styleUrl: './business-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap
  });

  private readonly businessId = computed<string>(() => (
    this.routeParams().get('id') ?? ''
  ));

  readonly business = computed<BusinessResult | undefined>(() => (
    MOCK_BUSINESS_RESULTS.find((item: BusinessResult) => item.id === this.businessId())
  ));

  readonly praises = computed<readonly BusinessPraise[]>(() => (
    MOCK_BUSINESS_PRAISES.filter((praise: BusinessPraise) => praise.businessId === this.businessId())
      .sort((first: BusinessPraise, second: BusinessPraise) => (
        second.publishedAt.localeCompare(first.publishedAt)
      ))
  ));

  formatDate(date: string): string {
    const parsedDate = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(parsedDate);
  }
}
