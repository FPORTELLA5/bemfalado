import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePreference } from '../../../shared/models/theme-preference.type';

@Component({
  selector: 'bf-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input({ required: true }) themePreference!: ThemePreference;
  @Output() readonly themeChange = new EventEmitter<ThemePreference>();

  mobileMenuOpen = false;

  onThemeChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const value = target.value;
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.themeChange.emit(value);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
