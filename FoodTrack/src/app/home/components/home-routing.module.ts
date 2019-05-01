import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessfullComponent } from './register-successfull/register-successfull.component';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home/login'
  },
  {
    path: 'home/login' , 
    component: LoginComponent
  },
  {
    path: 'home/register' ,
    component: RegisterComponent
  },
  {
    path: 'home/register-successfull',
    component: RegisterSuccessfullComponent
  }
  // {
  //   path: 'home',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: SiteLayoutComponent,
  //   children: [
  //     {
  //       path: 'home',
  //       component: LoginComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}