import type { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'BemFalado | Boas experiências merecem ser compartilhadas'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
