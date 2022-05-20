import { Component, Input, OnInit, Output,EventEmitter, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  //as we want to get the object from the parent, add 
  //decorator to the property name
  //prent can supply object to this property
  //alias name for input binding
  @Input("currentProject") project : Project;
  //for passing the index va;lue to the project component4
  @Input ("recordIndex") i :number;

//create two custom events in the child componenet(project here)
//decorate them with o/p, as want to use in parent(projects)
//and raise them 
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  //for using viewChild for communication
  //hideDetails: boolean = false;

  //for using observable as communicaion
  hideDetails: boolean = false;
  mySubscriptio :  Subscription;
  constructor(public projectService: ProjectsService) { }

  ngOnInit(): void {
    /*
    //will recive the boolean value as a parameter in the arow
    this.projectService.myObservable.subscribe((hide)=>{
      this.hideDetails = hide;
    }); 
    for Observable type comm.
    */ 
   // for subject type comm
   //due to perfomance issue, recommnded to store subscription inside mySubscription prop
   this.mySubscriptio =  this.projectService.mySubject.subscribe((hide)=>{
    this.hideDetails = hide;
  }); 

  }
  onEditClick(event: any, i: any)
  {
    this.editClick.emit({event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({event, i});
  }
  /*toggleDetails(){
    //parent -> projectsComponent
    //child -> project
    //goal: togglemethod should be invoke in parent component
    this.hideDetails = !this.hideDetails;
  }*/
  ngOnDestroy(){
    this.mySubscriptio.unsubscribe();
  }
  // accessing method of grand-child component in child component
  @ContentChild("selectionBox")selectionBox : CheckBoxPrinterComponent | any = null;
 
  
  isAllChecked(value: boolean){
    if(value){
    this.selectionBox.check();
    }
  else
  {
      this.selectionBox.unCheck();
  }
}
}
