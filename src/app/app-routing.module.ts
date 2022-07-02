import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { CanActiveGuardService } from './can-active-guard.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  {path: 'employee', canActivate: [CanActiveGuardService], data: { expectedRole: "Employee" }, children:[
    {path: "task", component: TaskComponent, canActivate: [CanActiveGuardService],
     data: { expectedRole: "Employee" } },
  ]}


 
  
];

@NgModule({
  //has enabled the hash routing
  //benefit of using this is that 
  //if u copy the same in any oher browser tab, the route will be displayed correctly
  //forRoot -> an array of routes
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
