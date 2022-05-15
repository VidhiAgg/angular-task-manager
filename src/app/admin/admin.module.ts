import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';
import { TeamSizeValidatorDirective } from '../team-size-validator.directive';
import { ClientLocationServiceValidatorDirective } from '../client-location-service-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../project-idunique-validator.directive';
@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective
  ],
  imports: [ CommonModule,FormsModule],
  exports:[
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective
     //so that project module can be imported by app module
  ],
  providers:[DashboardService]
})
export class AdminModule { }
