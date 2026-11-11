import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect, signal } from '@angular/core';
import { CategoryGridComponent } from './features/home/category-grid/category-grid.component';
import { FooterComponent } from './features/home/footer/footer.component';
import { HeaderComponent } from './features/home/header/header.component';
import { HeroSearchComponent, SearchCriteria } from './features/home/hero-search/hero-search.component';
import { ThemePreference } from './shared/models/theme-preference.type';

@Component({
  selector: 'bf-root',
  standalone: true,
  imports: [HeaderComponent, HeroSearchComponent, CategoryGridComponent, FooterComponent],
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

  onSearchRequested(criteria: SearchCriteria): void {
    const query = new URLSearchParams({
      q: criteria.term,
      local: criteria.location
    });
    console.info('Busca preparada para a próxima etapa:', query.toString());
  }

  onCategorySelected(categoryName: string): void {
    const query = new URLSearchParams({ categoria: categoryName });
    console.info('Categoria selecionada para a próxima etapa:', query.toString());
  }

  private readThemePreference(): ThemePreference {
    if (typeof localStorage === 'undefined') return 'system';
    const savedPreference = localStorage.getItem('bemfalado-theme');
    return savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system'
      ? savedPreference
      : 'system';
  }
}
