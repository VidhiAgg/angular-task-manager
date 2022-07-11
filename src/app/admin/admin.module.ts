import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './components/projects/projects.component';

import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';

import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent
  ],
  imports: [ SharedModule, AdminRoutingModule],
  exports:[
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    ProjectDetailsComponent // for making availabel to appRoutingModule
     //so that project module can be imported by app module
  ],
  providers:[DashboardService]
})
export class AdminModule { }
