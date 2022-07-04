import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, canDeactivate : [CanDeactivateGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  //has enabled the hash routing
  //benefit of using this is that 
  //if u copy the same in any oher browser tab, the route will be displayed correctly
  //forRoot -> an array of routes
  imports: [RouterModule.forRoot(routes,{useHash:true, enableTracing : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
