import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Project } from 'src/app/project';


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
  constructor() { }

  ngOnInit(): void {
  }
  onEditClick(event: any, i: any)
  {
    this.editClick.emit({event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({event, i});
  }
}
