import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';



@NgModule({
  declarations: [TaskComponent, CreateTaskComponent, UpdateTaskComponent, EditTaskComponent],
  imports: [
    SharedModule, EmployeeRoutingModule
  ],
  exports:[TaskComponent, CreateTaskComponent, UpdateTaskComponent, EditTaskComponent]
})
export class EmployeeModule { }
