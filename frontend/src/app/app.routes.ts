import type { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
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
    path: '**',
    redirectTo: ''
  }
];
