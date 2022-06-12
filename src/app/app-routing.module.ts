import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/core.module')
              .then(m => m.CoreModule) },
  
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module')
              .then(m => m.DashboardModule) },
  
  { path: 'users', component: UsersComponent,
              loadChildren: () => import('./users/users.module')
              .then(m => m.UsersModule) },

  { path: 'students', component: StudentsComponent,
          loadChildren: () => import('./students/students.module')
          .then(m => m.StudentsModule) },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
