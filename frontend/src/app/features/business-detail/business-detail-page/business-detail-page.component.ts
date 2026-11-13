import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { BusinessPraise } from '../models/business-praise.model';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { BusinessPhotoGalleryComponent } from '../business-photo-gallery/business-photo-gallery.component';
import { MOCK_BUSINESS_PHOTOS } from '../data/mock-business-photos';
import { MOCK_BUSINESS_PRAISES } from '../data/mock-business-praises';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { PRAISE_REPORT_REASONS } from '../models/praise-report.model';
import type { PraiseReportReason } from '../models/praise-report.model';
import { PraiseReportsService } from '../services/praise-reports.service';

@Component({
  selector: 'bf-business-detail-page',
  standalone: true,
  imports: [RouterLink, BusinessPhotoGalleryComponent],
  templateUrl: './business-detail-page.component.html',
  styleUrl: './business-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly favorites = inject(FavoritesService);
  private readonly praiseReports = inject(PraiseReportsService);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap
  });

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });
  readonly fromCategories = computed(() => this.queryParams().get('from') === 'categorias');
  readonly categoryQuery = computed(() => ({ category: this.queryParams().get('category') }));

  readonly reportReasons = PRAISE_REPORT_REASONS;
  readonly maxReportDetailsLength = 500;
  readonly activeReportPraiseId = signal<string | null>(null);
  readonly selectedReportReason = signal<PraiseReportReason>('unrelated-experience');
  readonly reportDetails = signal<string>('');
  readonly reportSubmittedFor = signal<string | null>(null);

  private readonly businessId = computed<string>(() => (
    this.routeParams().get('id') ?? ''
  ));

  readonly business = computed<BusinessResult | undefined>(() => (
    MOCK_BUSINESS_RESULTS.find((item: BusinessResult) => item.id === this.businessId())
  ));

  readonly photos = computed(() => MOCK_BUSINESS_PHOTOS[this.businessId()] ?? []);

  readonly praises = computed<readonly BusinessPraise[]>(() => (
    MOCK_BUSINESS_PRAISES.filter((praise: BusinessPraise) => praise.businessId === this.businessId())
      .sort((first: BusinessPraise, second: BusinessPraise) => (
        second.publishedAt.localeCompare(first.publishedAt)
      ))
  ));

  toggleFavorite(businessId: string): void {
    this.favorites.toggle(businessId);
  }

  openReportForm(praiseId: string): void {
    this.reportSubmittedFor.set(null);
    this.selectedReportReason.set('unrelated-experience');
    this.reportDetails.set('');
    this.activeReportPraiseId.set(praiseId);
  }

  closeReportForm(): void {
    this.activeReportPraiseId.set(null);
    this.reportSubmittedFor.set(null);
    this.reportDetails.set('');
  }

  onReportReasonChange(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLSelectElement)) {
      return;
    }

    const selectedReason = PRAISE_REPORT_REASONS.find(
      (reason) => reason.value === target.value
    );

    if (selectedReason) {
      this.selectedReportReason.set(selectedReason.value);
    }
  }

  onReportDetailsInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLTextAreaElement) {
      this.reportDetails.set(target.value.slice(0, this.maxReportDetailsLength));
    }
  }

  submitReport(event: Event, praiseId: string): void {
    event.preventDefault();

    if (this.activeReportPraiseId() !== praiseId) {
      return;
    }

    this.praiseReports.submit({
      praiseId,
      reason: this.selectedReportReason(),
      details: this.reportDetails().trim()
    });

    this.reportSubmittedFor.set(praiseId);
    this.activeReportPraiseId.set(null);
  }

  formatDate(date: string): string {
    const parsedDate = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(parsedDate);
  }
}
