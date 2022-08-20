import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../components/task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from './../../guards/can-active-guard.service';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { UpdateTaskComponent } from '../components/update-task/update-task.component';


const routes: Routes =[
  {path: "", canActivate: [CanActiveGuardService], data: {
     expectedRole: "Employee" }, children:[
    {path: "task", component: TaskComponent,  data:{linkIndex:7}},
    {path: "createTask", component: CreateTaskComponent,  data:{linkIndex:8}},
    {path: "editTask/:taskId", component: EditTaskComponent,  data:{linkIndex:9}},
    {path: "updateTask/:taskId", component: UpdateTaskComponent,  data:{linkIndex:7} }
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
