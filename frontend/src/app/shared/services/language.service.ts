import { Injectable, effect, signal } from '@angular/core';

export type Language = 'pt' | 'en' | 'es';
const words = {
  pt: {
    explore: 'Explorar', categories: 'Categorias', how: 'Como funciona', companies: 'Para empresas',
    login: 'Entrar', signup: 'Criar conta', light: 'Ativar modo claro', dark: 'Ativar modo escuro',
    heroStart: 'Descubra lugares que fazem', heroEnd: 'bem falar.',
    heroText: 'Encontre negócios recomendados por quem já viveu a experiência.',
    searchHint: 'O que você procura?', searchPlaceholder: 'Lugar, empresa ou serviço',
    locationHint: 'Cidade ou região', locationPlaceholder: 'Cidade ou bairro',
    searchButton: 'Buscar', exploreFree: 'Explore sem criar uma conta.',
    empty: 'Digite o nome de um lugar, empresa ou serviço para começar.', loading: 'Abrindo resultados...'
  },
  en: {
    explore: 'Explore', categories: 'Categories', how: 'How it works', companies: 'For businesses',
    login: 'Log in', signup: 'Sign up', light: 'Switch to light mode', dark: 'Switch to dark mode',
    heroStart: 'Discover places worth', heroEnd: 'talking about.',
    heroText: 'Find businesses recommended by people who know them.',
    searchHint: 'What are you looking for?', searchPlaceholder: 'Place, business or service',
    locationHint: 'City or region', locationPlaceholder: 'City or neighborhood',
    searchButton: 'Search', exploreFree: 'Explore without an account.',
    empty: 'Enter a place, business or service to begin.', loading: 'Opening results...'
  },
  es: {
    explore: 'Explorar', categories: 'Categorías', how: 'Cómo funciona', companies: 'Para empresas',
    login: 'Iniciar sesión', signup: 'Crear cuenta', light: 'Activar modo claro', dark: 'Activar modo oscuro',
    heroStart: 'Descubre lugares de los que', heroEnd: 'vale hablar.',
    heroText: 'Encuentra negocios recomendados por quienes ya los conocen.',
    searchHint: '¿Qué estás buscando?', searchPlaceholder: 'Lugar, empresa o servicio',
    locationHint: 'Ciudad o región', locationPlaceholder: 'Ciudad o barrio',
    searchButton: 'Buscar', exploreFree: 'Explora sin crear una cuenta.',
    empty: 'Escribe el nombre de un lugar, empresa o servicio.', loading: 'Abriendo resultados...'
  }
} as const;
type Key = keyof typeof words.pt;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>(this.readLanguage());
  constructor() {
    effect(() => {
      const language = this.language();
      if (typeof document !== 'undefined') document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
      if (typeof localStorage !== 'undefined') localStorage.setItem('bemfalado-language', language);
    });
  }
  change(language: Language): void { this.language.set(language); }
  t(key: Key): string { return words[this.language()][key]; }
  private readLanguage(): Language {
    if (typeof localStorage === 'undefined') return 'pt';
    const value = localStorage.getItem('bemfalado-language');
    return value === 'en' || value === 'es' ? value : 'pt';
  }
}
