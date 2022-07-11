import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/components/about/about.component';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, data:{linkIndex:3}, canDeactivate : [CanDeactivateGuardService] },
  { path: 'login', component: LoginComponent, data:{linkIndex:2} },
  { path: 'about', component: AboutComponent, data:{linkIndex:1}}
];

@NgModule({
  //has enabled the hash routing
  //benefit of using this is that 
  //if u copy the same in any oher browser tab, the route will be displayed correctly
  //forRoot -> an array of routes
  imports: [RouterModule.forRoot(routes,{useHash:true, enableTracing : false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
