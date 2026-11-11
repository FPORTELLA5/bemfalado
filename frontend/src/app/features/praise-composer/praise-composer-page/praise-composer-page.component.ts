import { ChangeDetectionStrategy, Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import type { PhotoAttachment } from '../models/photo-attachment.model';
import type { BusinessRequestDraft } from '../models/business-request-draft.model';
import { TextModerationService } from '../services/text-moderation.service';
import { PhotoValidationService } from '../services/photo-validation.service';

type ComposerStep = 1 | 2 | 3 | 4;
type TextField = 'title' | 'content';
type BusinessRequestField = keyof BusinessRequestDraft;

const MAX_PHOTOS = 3;

function normalizeSearchTerm(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('pt-BR');
}

@Component({
  selector: 'bf-praise-composer-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './praise-composer-page.component.html',
  styleUrl: './praise-composer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PraiseComposerPageComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly textModeration = inject(TextModerationService);
  private readonly photoValidation = inject(PhotoValidationService);

  constructor() {
    const requestedBusinessId = this.route.snapshot.queryParamMap.get('businessId');
    const requestedBusiness = this.businesses.find((business: BusinessResult) => business.id === requestedBusinessId);

    if (requestedBusiness) {
      this.selectedBusinessId.set(requestedBusiness.id);
      this.businessSearchTerm.set(requestedBusiness.name);
    }
  }

  readonly step = signal<ComposerStep>(1);
  readonly businesses: readonly BusinessResult[] = MOCK_BUSINESS_RESULTS;
  readonly businessSearchTerm = signal<string>('');
  readonly selectedBusinessId = signal<string>('');
  readonly selectedQualities = signal<readonly string[]>([]);
  readonly title = signal<string>('');
  readonly content = signal<string>('');
  readonly titleModeration = computed(() => this.textModeration.validate(this.title()));
  readonly contentModeration = computed(() => this.textModeration.validate(this.content()));
  readonly hasTextModerationIssues = computed<boolean>(() => (
    this.titleModeration().status !== 'allowed' || this.contentModeration().status !== 'allowed'
  ));
  readonly photoAttachments = signal<readonly PhotoAttachment[]>([]);
  readonly photoFeedback = signal<string>('');
  readonly isProcessingPhotos = signal<boolean>(false);
  readonly isFinished = signal<boolean>(false);
  readonly showPrivateExperienceConfirmation = signal<boolean>(false);
  readonly isPrivateExperienceFinished = signal<boolean>(false);
  readonly showBusinessRequestForm = signal<boolean>(false);
  readonly businessRequestSubmitted = signal<boolean>(false);
  readonly businessRequestCategories: readonly string[] = [
    'Alimentação e bebidas',
    'Saúde e bem-estar',
    'Beleza e estética',
    'Comércio e lojas',
    'Casa e construção',
    'Automóveis e transporte',
    'Educação',
    'Turismo e hospedagem',
    'Tecnologia e serviços digitais',
    'Outros serviços'
  ];
  readonly businessRequest = signal<BusinessRequestDraft>({
    businessName: '',
    category: '',
    city: '',
    neighborhood: '',
    businessPhone: '',
    businessEmail: '',
    instagramProfile: '',
    website: ''
  });
  readonly canSubmitBusinessRequest = computed<boolean>(() => {
    const request = this.businessRequest();
    return request.businessName.trim().length >= 2
      && request.category.length > 0
      && request.city.trim().length >= 2;
  });

  readonly filteredBusinesses = computed<readonly BusinessResult[]>(() => {
    const term = normalizeSearchTerm(this.businessSearchTerm());
    if (!term) return this.businesses;

    return this.businesses.filter((business: BusinessResult) => {
      const searchableText = normalizeSearchTerm([
        business.name,
        business.category,
        business.description,
        business.neighborhood,
        business.city
      ].join(' '));

      return searchableText.includes(term);
    });
  });

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
        return this.title().trim().length >= 5
          && this.content().trim().length >= 30
          && !this.hasTextModerationIssues();
      case 4:
        return true;
    }
  });

  onBusinessSearch(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    this.businessSearchTerm.set(target.value);
    this.selectedBusinessId.set('');
  }

  openBusinessRequest(): void {
    this.businessRequest.update((current: BusinessRequestDraft) => ({
      ...current,
      businessName: this.businessSearchTerm().trim()
    }));
    this.showBusinessRequestForm.set(true);
    this.businessRequestSubmitted.set(false);
  }

  onBusinessRequestInput(event: Event, field: BusinessRequestField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) return;

    this.businessRequest.update((current: BusinessRequestDraft) => ({
      ...current,
      [field]: target.value
    }));
  }

  submitBusinessRequest(): void {
    if (!this.canSubmitBusinessRequest()) return;
    this.businessRequestSubmitted.set(true);
  }

  closeBusinessRequest(): void {
    this.showBusinessRequestForm.set(false);
    this.businessRequestSubmitted.set(false);
  }

  onBusinessSelect(businessId: string): void {
    this.selectedBusinessId.set(businessId);
    this.showPrivateExperienceConfirmation.set(false);
  }

  openPrivateExperienceConfirmation(): void {
    if (!this.selectedBusiness()) return;
    this.showPrivateExperienceConfirmation.set(true);
  }

  cancelPrivateExperienceConfirmation(): void {
    this.showPrivateExperienceConfirmation.set(false);
  }

  finishPrivateExperienceDemo(): void {
    if (!this.selectedBusiness() || !this.showPrivateExperienceConfirmation()) return;
    this.showPrivateExperienceConfirmation.set(false);
    this.isPrivateExperienceFinished.set(true);
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

  async onPhotosSelected(event: Event): Promise<void> {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || this.isProcessingPhotos()) return;

    const selectedFiles = Array.from(target.files ?? []);
    const remainingSlots = MAX_PHOTOS - this.photoAttachments().length;
    const acceptedFiles: File[] = [];
    const feedbackMessages: string[] = [];

    if (remainingSlots <= 0) {
      this.photoFeedback.set('Você já atingiu o limite de 3 fotos.');
      target.value = '';
      return;
    }

    this.isProcessingPhotos.set(true);
    this.photoFeedback.set('Verificando formato e integridade das imagens...');

    try {
      for (const file of selectedFiles) {
        if (acceptedFiles.length >= remainingSlots) {
          feedbackMessages.push('O limite é de 3 fotos por elogio.');
          break;
        }

        const validation = await this.photoValidation.validate(file);
        if (!validation.valid) {
          feedbackMessages.push(validation.message);
          continue;
        }

        acceptedFiles.push(file);
      }

      const newAttachments: PhotoAttachment[] = acceptedFiles.map((file: File) => ({
        file,
        previewUrl: URL.createObjectURL(file)
      }));

      this.photoAttachments.update((current: readonly PhotoAttachment[]) => [
        ...current,
        ...newAttachments
      ]);
      this.photoFeedback.set(feedbackMessages[0] ?? (
        acceptedFiles.length > 0 ? 'Imagem(ns) validada(s) para pré-visualização.' : ''
      ));
    } finally {
      this.isProcessingPhotos.set(false);
      target.value = '';
    }
  }

  removePhoto(previewUrl: string): void {
    const attachment = this.photoAttachments().find((photo: PhotoAttachment) => photo.previewUrl === previewUrl);
    if (!attachment) return;

    URL.revokeObjectURL(attachment.previewUrl);
    this.photoAttachments.update((current: readonly PhotoAttachment[]) => (
      current.filter((photo: PhotoAttachment) => photo.previewUrl !== previewUrl)
    ));
    this.photoFeedback.set('');
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

  ngOnDestroy(): void {
    for (const attachment of this.photoAttachments()) {
      URL.revokeObjectURL(attachment.previewUrl);
    }
  }
}
