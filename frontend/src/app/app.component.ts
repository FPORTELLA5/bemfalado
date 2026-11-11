import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

type ThemePreference = 'light' | 'dark' | 'system';

interface Category {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'bf-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly themePreference = signal<ThemePreference>(this.readThemePreference());
  readonly mobileMenuOpen = signal(false);
  readonly searchTerm = signal('');
  readonly locationTerm = signal('');

  readonly categories: Category[] = [
    { name: 'Alimentação', icon: 'utensils', description: 'Restaurantes, cafés e bares' },
    { name: 'Saúde e bem-estar', icon: 'heart', description: 'Clínicas, academias e cuidados' },
    { name: 'Beleza e estética', icon: 'sparkles', description: 'Salões, estética e autocuidado' },
    { name: 'Comércio e lojas', icon: 'shopping-bag', description: 'Lojas físicas e online' },
    { name: 'Casa e construção', icon: 'house', description: 'Reformas, materiais e serviços' },
    { name: 'Automóveis e transporte', icon: 'car', description: 'Oficinas, mobilidade e veículos' },
    { name: 'Educação', icon: 'graduation-cap', description: 'Escolas, cursos e aprendizado' },
    { name: 'Turismo e hospedagem', icon: 'compass', description: 'Viagens, hotéis e passeios' },
    { name: 'Tecnologia', icon: 'monitor', description: 'Produtos e serviços digitais' },
    { name: 'Outros serviços', icon: 'grid', description: 'Serviços para o dia a dia' }
  ];

  constructor() {
    effect(() => {
      const preference = this.themePreference();
      if (typeof document === 'undefined') return;

      const resolved = preference === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : preference;

      document.documentElement.dataset['theme'] = resolved;
      document.documentElement.style.colorScheme = resolved;
      localStorage.setItem('bemfalado-theme', preference);
    });
  }

  setTheme(preference: ThemePreference): void {
    this.themePreference.set(preference);
  }

  toggleTheme(): void {
    const current = this.resolvedTheme();
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  resolvedTheme(): 'light' | 'dark' {
    const preference = this.themePreference();
    if (preference === 'system') {
      return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return preference;
  }

  submitSearch(): void {
    const term = this.searchTerm().trim();
    if (!term) {
      document.getElementById('search-input')?.focus();
      return;
    }
    const query = new URLSearchParams({ q: term, local: this.locationTerm().trim() });
    window.location.href = `/buscar?${query.toString()}`;
  }

  selectCategory(category: string): void {
    window.location.href = `/buscar?categoria=${encodeURIComponent(category)}`;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  private readThemePreference(): ThemePreference {
    if (typeof localStorage === 'undefined') return 'system';
    const saved = localStorage.getItem('bemfalado-theme');
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  }
}