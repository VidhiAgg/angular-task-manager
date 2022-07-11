import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from 'src/app/guards/can-active-guard.service';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/projects/projects.component';
const routes: Routes = [
  {path: '', canActivate : [CanActiveGuardService],data: {
    expectedRole : "Admin" }, children:[
    { path: 'projects/details/:projectid', component: ProjectDetailsComponent, data:{linkIndex: 5}},
    { path: 'dashboard', component: DashboardComponent, data:{linkIndex: 0}},
    { path: 'projects', component: ProjectsComponent, data:{linkIndex: 4} }
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
