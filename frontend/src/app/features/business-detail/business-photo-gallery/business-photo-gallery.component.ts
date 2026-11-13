import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import type { BusinessPhoto } from '../models/business-photo.model';

@Component({
  selector: 'bf-business-photo-gallery',
  standalone: true,
  templateUrl: './business-photo-gallery.component.html',
  styleUrl: './business-photo-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessPhotoGalleryComponent {
  readonly photos = input.required<readonly BusinessPhoto[]>();
  readonly activeIndex = signal(0);
  readonly activePhoto = computed(() => this.photos()[this.activeIndex()]);

  openPhoto(dialog: HTMLDialogElement, index: number): void {
    this.activeIndex.set(index);
    dialog.showModal();
  }

  movePhoto(offset: number): void {
    const count = this.photos().length;
    this.activeIndex.update((index) => (index + offset + count) % count);
  }
}
