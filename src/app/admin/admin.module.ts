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
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent } from './check-box-printer/check-box-printer.component';
import { NumberToWordPipe } from '../number-to-word.pipe';
import { FilterPipe } from '../filter.pipe';
import { PagingPipe } from '../paging.pipe';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    ProjectComponent,
    CheckBoxPrinterComponent,
    NumberToWordPipe,
    FilterPipe,
    PagingPipe,
    ProjectDetailsComponent
  ],
  imports: [ CommonModule,FormsModule,AdminRoutingModule],
  exports:[
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    ProjectDetailsComponent // for making availabel to appRoutingModule
     //so that project module can be imported by app module
  ],
  providers:[DashboardService]
})
export class AdminModule { }
