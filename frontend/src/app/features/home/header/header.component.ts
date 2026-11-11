import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import type { ThemePreference } from '../../../shared/models/theme-preference.type';

@Component({
  selector: 'bf-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly themePreference = input.required<ThemePreference>();
  readonly themeChange = output<ThemePreference>();

  readonly mobileMenuOpen = signal(false);

  onThemeChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const value = target.value;
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.themeChange.emit(value);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((isOpen: boolean) => !isOpen);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
