import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/core.module')
              .then(m => m.CoreModule) },
  
  { path: 'users', component: UsersComponent,
              loadChildren: () => import('./users/users.module')
              .then(m => m.UsersModule) },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
