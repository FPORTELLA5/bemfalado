import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './features/home/footer/footer.component';
import { HeaderComponent } from './features/home/header/header.component';
import type { ThemePreference } from './shared/models/theme-preference.type';

@Component({
  selector: 'bf-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  readonly themePreference = signal<ThemePreference>(this.readThemePreference());

  constructor() {
    effect((onCleanup) => {
      const preference = this.themePreference();
      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = (): void => {
        const resolvedTheme = preference === 'system'
          ? (media.matches ? 'dark' : 'light')
          : preference;

        document.documentElement.dataset['theme'] = resolvedTheme;
        document.documentElement.style.colorScheme = resolvedTheme;
      };

      applyTheme();

      if (preference === 'system') {
        media.addEventListener('change', applyTheme);
        onCleanup(() => media.removeEventListener('change', applyTheme));
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('bemfalado-theme', preference);
      }
    });
  }

  setTheme(preference: ThemePreference): void {
    this.themePreference.set(preference);
  }

  private readThemePreference(): ThemePreference {
    if (typeof localStorage === 'undefined') return 'system';
    const savedPreference = localStorage.getItem('bemfalado-theme');
    return savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system'
      ? savedPreference
      : 'system';
  }
}
