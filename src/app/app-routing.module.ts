import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'login',
  component:AdminLoginComponent
},
{
  path:'dashboard',
  component:AdminDashboardComponent
},
{ path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
