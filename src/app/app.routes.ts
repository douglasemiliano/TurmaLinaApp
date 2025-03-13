import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {path: 'cursos/:id', loadComponent: () => import('./pages/atividade/listar-atividade/listar-atividade.component').then(m => m.ListarAtividadeComponent)},

];
