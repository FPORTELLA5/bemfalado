import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[bfFocusOnRender]',
  standalone: true
})
export class FocusOnRenderDirective {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef);
    afterNextRender(() => element.nativeElement.focus());
  }
}
