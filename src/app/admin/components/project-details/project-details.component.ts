import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../../models/project';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  routeParamsSubscription: Subscription; //to store the subscription


  constructor(private activatedRoute: ActivatedRoute,
    private projctsService: ProjectsService) { 
      this.project = new Project();
    }

  ngOnInit(): void {
   this.routeParamsSubscription = this.activatedRoute.params.subscribe((params)=>{
      //projectid must be same that of given in rout
      let id = params["projectid"];
      this.projctsService.getProjectByID(id).subscribe((project: Project)=>{
        this.project = project

      })
    })
  }
  ngOnDestroy(){
    this.routeParamsSubscription.unsubscribe();
  }

}
