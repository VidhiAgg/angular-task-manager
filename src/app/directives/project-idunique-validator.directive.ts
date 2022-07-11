import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectsService } from '../services/projects.service';



@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers: [{provide:NG_ASYNC_VALIDATORS, useExisting: ProjectIDUniqueValidatorDirective, multi: true}]

})
export class ProjectIDUniqueValidatorDirective implements AsyncValidator{

  constructor(private projectService: ProjectsService) { }

  validate(control:AbstractControl): Observable<ValidationErrors | null>
  {
    return this.projectService.getProjectByID(control.value).pipe(map((existingProject: Project) =>
    {
      if (existingProject != null) {
        return {uniqueProjectID : {valid : false}};
      } 
      else {
        return null;
      }
    }
    ));
   
  }

}
