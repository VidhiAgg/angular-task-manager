import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TaskComponent],
  imports: [
    SharedModule
  ],
  exports:[TaskComponent]
})
export class EmployeeModule { }
