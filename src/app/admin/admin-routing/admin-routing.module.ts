import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from 'src/app/can-active-guard.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectsComponent } from '../projects/projects.component';
const routes: Routes = [
  {path: 'admin', canActivate : [CanActiveGuardService],data: {
    expectedRole : "Admin" }, children:[
    { path: 'projects/details/:projectid', component: ProjectDetailsComponent,canActivate : [CanActiveGuardService],
    data: {expectedRole : "Admin" } },
    { path: 'dashboard', component: DashboardComponent, canActivate : [CanActiveGuardService],data: {
    expectedRole : "Admin" } },
    { path: 'projects', component: ProjectsComponent, canActivate : [CanActiveGuardService],data: {
    expectedRole : "Admin" } }
  ]}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
