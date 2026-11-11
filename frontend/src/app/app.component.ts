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
  readonly searchFeedback = signal('');

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
    effect((onCleanup) => {
      const preference = this.themePreference();
      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = (): void => {
        const resolved = preference === 'system'
          ? (media.matches ? 'dark' : 'light')
          : preference;
        document.documentElement.dataset['theme'] = resolved;
        document.documentElement.style.colorScheme = resolved;
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
      this.searchFeedback.set('Digite o nome de um lugar, empresa ou serviço para começar.');
      document.getElementById('search-input')?.focus();
      return;
    }
    this.searchFeedback.set('Busca selecionada. A próxima etapa será conectar este campo aos resultados reais do BemFalado.');
  }

  selectCategory(category: string): void {
    this.searchTerm.set(category);
    this.searchFeedback.set(`Categoria “${category}” selecionada. Você pode complementar a busca acima.`);
    document.getElementById('search-input')?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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