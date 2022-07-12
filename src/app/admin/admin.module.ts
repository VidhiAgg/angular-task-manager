import { NgModule } from '@angular/core';

import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './components/projects/projects.component';

import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';

import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClientLocationsComponent } from './components/client-locations/client-locations.component';
import { CountriesComponent } from './components/countries/countries.component';
import { MastersComponent } from './components/masters/masters.component';
import { TaskPrioritiesComponent } from './components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
   ClientLocationsComponent,
   TaskPrioritiesComponent,
   TaskStatusComponent,
   MastersComponent
  ],
  imports: [ SharedModule, AdminRoutingModule],
  exports:[
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectDetailsComponent // for making availabel to appRoutingModule
     //so that project module can be imported by app module
  ],
  providers:[DashboardService]
})
export class AdminModule { }
