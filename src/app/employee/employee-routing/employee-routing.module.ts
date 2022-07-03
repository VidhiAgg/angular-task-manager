import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from 'src/app/can-active-guard.service';


const routes: Routes =[
  {path: 'employee', canActivate: [CanActiveGuardService], data: { expectedRole: "Employee" }, children:[
    {path: "task", component: TaskComponent, canActivate: [CanActiveGuardService],
     data: { expectedRole: "Employee" } },
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
