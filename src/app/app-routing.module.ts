import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { Error404Page } from './core/pages/error404/error404.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/task/task-routing.module').then((m) => m.TaskRoutingModule),
  },
  //{ path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: '404', component: Error404Page },
  { path: '**', redirectTo: '/' + '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
