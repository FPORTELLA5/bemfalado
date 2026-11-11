import type { Routes } from '@angular/router';
import { BusinessDetailPageComponent } from './features/business-detail/business-detail-page/business-detail-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { RegistrationPageComponent } from './features/auth/registration-page/registration-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { PasswordRecoveryPageComponent } from './features/auth/password-recovery-page/password-recovery-page.component';
import { PraiseComposerPageComponent } from './features/praise-composer/praise-composer-page/praise-composer-page.component';
import { SearchResultsPageComponent } from './features/search-results/search-results-page/search-results-page.component';
import { UserProfilePageComponent } from './features/user-profile/user-profile-page/user-profile-page.component';

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
    path: 'minha-conta',
    component: UserProfilePageComponent,
    title: 'Meu perfil | BemFalado'
  },
  {
    path: 'entrar',
    component: LoginPageComponent,
    title: 'Entrar | BemFalado'
  },
  {
    path: 'recuperar-senha',
    component: PasswordRecoveryPageComponent,
    title: 'Recuperar senha | BemFalado'
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
