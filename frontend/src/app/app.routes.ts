import type { Routes } from '@angular/router';
import { BusinessDetailPageComponent } from './features/business-detail/business-detail-page/business-detail-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { RegistrationPageComponent } from './features/auth/registration-page/registration-page.component';
import { PraiseComposerPageComponent } from './features/praise-composer/praise-composer-page/praise-composer-page.component';
import { SearchResultsPageComponent } from './features/search-results/search-results-page/search-results-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'BemFalado | Boas experiências merecem ser compartilhadas'
  },
  {
    path: 'buscar',
    component: SearchResultsPageComponent,
    title: 'Buscar | BemFalado'
  },
  {
    path: 'negocio/:id',
    component: BusinessDetailPageComponent,
    title: 'Perfil do estabelecimento | BemFalado'
  },
  {
    path: 'criar-conta',
    component: RegistrationPageComponent,
    title: 'Criar conta | BemFalado'
  },
  {
    path: 'compartilhar',
    component: PraiseComposerPageComponent,
    title: 'Compartilhar experiência | BemFalado'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
