import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {DocumentComponent} from './document/document.component';
import { ErrorComponent } from './error/error.component';
const routes: Routes = [
{ path: '', redirectTo: '/home',pathMatch:'full'},
{
  path:'login',
  component: LoginComponent
},
{
  path:'signup',
  component: SignupComponent
},
{
  path:'home',
  component: HomeComponent
},
{
  path:'doc/:id',
  component: DocumentComponent
},
{ path: '404' , component: ErrorComponent },
{ path: '**' , redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
