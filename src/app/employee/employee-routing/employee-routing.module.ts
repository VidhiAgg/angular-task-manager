import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../components/task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from './../../guards/can-active-guard.service';


const routes: Routes =[
  {path: 'employee', canActivate: [CanActiveGuardService], data: { expectedRole: "Employee" }, children:[
    {path: "task", component: TaskComponent,  data:{linkIndex:6} },
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
export class EmployeeRoutingModule { }
