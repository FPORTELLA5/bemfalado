import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { BusinessResult } from '../../search-results/models/business-result.model';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import type { PhotoAttachment } from '../models/photo-attachment.model';
import type { BusinessRequestDraft } from '../models/business-request-draft.model';

type ComposerStep = 1 | 2 | 3 | 4;
type TextField = 'title' | 'content';
type BusinessRequestField = keyof BusinessRequestDraft;

const MAX_PHOTOS = 3;
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES: readonly string[] = ['image/jpeg', 'image/png', 'image/webp'];

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
  readonly step = signal<ComposerStep>(1);
  readonly businesses: readonly BusinessResult[] = MOCK_BUSINESS_RESULTS;
  readonly businessSearchTerm = signal<string>('');
  readonly selectedBusinessId = signal<string>('');
  readonly selectedQualities = signal<readonly string[]>([]);
  readonly title = signal<string>('');
  readonly content = signal<string>('');
  readonly photoAttachments = signal<readonly PhotoAttachment[]>([]);
  readonly photoFeedback = signal<string>('');
  readonly isFinished = signal<boolean>(false);
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
        return this.title().trim().length >= 5 && this.content().trim().length >= 30;
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

  onPhotosSelected(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    const selectedFiles = Array.from(target.files ?? []);
    const currentAttachments = this.photoAttachments();
    const remainingSlots = MAX_PHOTOS - currentAttachments.length;
    const acceptedFiles: File[] = [];
    const feedbackMessages: string[] = [];

    if (remainingSlots <= 0) {
      this.photoFeedback.set('Você já atingiu o limite de 3 fotos.');
      target.value = '';
      return;
    }

    for (const file of selectedFiles) {
      if (acceptedFiles.length >= remainingSlots) {
        feedbackMessages.push('O limite é de 3 fotos por elogio.');
        break;
      }

      if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
        feedbackMessages.push('Use imagens JPG, PNG ou WebP.');
        continue;
      }

      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        feedbackMessages.push('Cada imagem deve ter no máximo 5 MB.');
        continue;
      }

      acceptedFiles.push(file);
    }

    const newAttachments: PhotoAttachment[] = acceptedFiles.map((file: File) => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    this.photoAttachments.set([...currentAttachments, ...newAttachments]);
    this.photoFeedback.set(feedbackMessages[0] ?? '');
    target.value = '';
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
