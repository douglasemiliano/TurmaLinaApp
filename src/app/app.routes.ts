import { Routes } from '@angular/router';
import { CallbackComponent } from './pages/auth/callback/callback.component';

export const routes: Routes = [
  
  {path: '', loadComponent: () => import('./pages/loading/loading.component').then(m => m.LoadingComponent)},
  { path: 'callback', component: CallbackComponent },
  {path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)},
  {path: 'cursos', loadComponent: () => import("./pages/curso/listar-curso/listar-curso.component").then(m => m.ListarCursoComponent)},
  {path: 'cursos/:id', loadComponent: () => import('./pages/atividade/listar-atividade/listar-atividade.component').then(m => m.ListarAtividadeComponent)},
  {path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)},
  {
    path: 'tab2',
    loadComponent: () =>
      import('./tab2/tab2.page').then((m) => m.Tab2Page),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./tab3/tab3.page').then((m) => m.Tab3Page),
  },
  {
    path: 'tab1',
    loadComponent: () =>
      import('./tab1/tab1.page').then((m) => m.Tab1Page),
  }
];
