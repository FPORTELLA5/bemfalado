import type { Routes } from '@angular/router';
import { BusinessDetailPageComponent } from './features/business-detail/business-detail-page/business-detail-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { RegistrationPageComponent } from './features/auth/registration-page/registration-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { PasswordRecoveryPageComponent } from './features/auth/password-recovery-page/password-recovery-page.component';
import { PraiseComposerPageComponent } from './features/praise-composer/praise-composer-page/praise-composer-page.component';
import { SearchResultsPageComponent } from './features/search-results/search-results-page/search-results-page.component';
import { UserProfilePageComponent } from './features/user-profile/user-profile-page/user-profile-page.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';
import { NotificationsPageComponent } from './features/notifications/notifications-page/notifications-page.component';
import { ModerationQueuePageComponent } from './features/moderation/moderation-queue-page/moderation-queue-page.component';
import { InstitutionalPageComponent } from './features/institutional/institutional-page/institutional-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'BemFalado | Boas experiências merecem ser compartilhadas' },
  { path: 'buscar', component: SearchResultsPageComponent, title: 'Buscar | BemFalado' },
  { path: 'negocio/:id', component: BusinessDetailPageComponent, title: 'Perfil do estabelecimento | BemFalado' },
  { path: 'minha-conta', component: UserProfilePageComponent, title: 'Meu perfil | BemFalado' },
  { path: 'favoritos', component: FavoritesPageComponent, title: 'Estabelecimentos salvos | BemFalado' },
  { path: 'notificacoes', component: NotificationsPageComponent, title: 'Notificações | BemFalado' },
  { path: 'entrar', component: LoginPageComponent, title: 'Entrar | BemFalado' },
  { path: 'recuperar-senha', component: PasswordRecoveryPageComponent, title: 'Recuperar senha | BemFalado' },
  { path: 'criar-conta', component: RegistrationPageComponent, title: 'Criar conta | BemFalado' },
  { path: 'compartilhar', component: PraiseComposerPageComponent, title: 'Compartilhar experiência | BemFalado' },
  { path: 'sobre', component: InstitutionalPageComponent, title: 'Sobre o BemFalado' },
  { path: 'como-funciona', component: InstitutionalPageComponent, title: 'Como funciona | BemFalado' },
  { path: 'diretrizes', component: InstitutionalPageComponent, title: 'Diretrizes da comunidade | BemFalado' },
  { path: 'contato', component: InstitutionalPageComponent, title: 'Contato | BemFalado' },
  { path: 'empresas', component: InstitutionalPageComponent, title: 'Para empresas | BemFalado' },
  { path: 'privacidade', component: InstitutionalPageComponent, title: 'Privacidade | BemFalado' },
  { path: 'termos', component: InstitutionalPageComponent, title: 'Termos de uso | BemFalado' },
  {
    path: 'demonstracao/moderacao',
    component: ModerationQueuePageComponent,
    title: 'Central de moderação — demonstração | BemFalado'
  },
  { path: '**', redirectTo: '' }
];
