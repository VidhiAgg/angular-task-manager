import { Component, OnInit } from '@angular/core';
import { Project } from '../../project';
import { ProjectsService } from '../..//projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

newProject:Project= new Project();
projects:Project[];  
//for storing the data of current project which you are editing right now
editProject: Project = new Project();      
//for storing the index of the current working row
editIndex: any=null;   
//for deleting
deleteProject: Project = new Project();
deleteIndex:any=null;
searchBy:string="ProjectName";
searchText:string="";
  constructor(private projctService: ProjectsService) { }

  ngOnInit(): void {
    //will return observable of project
    //subscribe method creates observer
    this.projctService.gtAllProjects().subscribe(
      //user error function that will execute after receiving data from server
      //we are using a variable "response" of project array data type
      //this data type should be same that u have mentioned in observable
      (response:Project[])=>{ 
        this.projects=response; // assigning same to the project poperty of current component
      },
      //since using intercepttor for handling errors, no need for this
      /*(error) =>{
        alert("Authentication failed");
        console.log("error");
        
      }*/
    );
  }

  addNewProject():void{
    this.projctService.insertProject(this.newProject).subscribe((response)=>{
      //this.projects.push(this.newProject) its not recomded because next time when you assign 
      //this.newProject.projectID = null, the same null value will automatically aafected in the 
      //recomeded to create a new obj of classand copy all data from response to obj
      //and add newy created obj to projects array
      var obj: Project = new Project();
      obj.projectID = response.projectID;
      obj.projectName = response.projectName;
      obj.dateOfStart = response.dateOfStart;
      obj.teamSize = response.teamSize;
      this.projects.push(obj);

    
    },
      (error:any)=>{console.log(error)});
  }
  // index:number -> to get the row for which user will clicks on edit button
  onEditClick(event:any, index:number){
    this.editProject.projectID=this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editIndex=index;

  }
  updateProject(){
    this.projctService.updateProject(this.editProject).subscribe((response)=>{
      var obj: Project = new Project();
      obj.projectID = response.projectID;
      obj.projectName = response.projectName;
      obj.dateOfStart = response.dateOfStart;
      obj.teamSize = response.teamSize;
      this.projects[this.editIndex] = obj;
      //Clearing field

      this.editProject.dateOfStart=null;
      this.editProject.projectID=null;
      this.editProject.projectName=null;
      this.editProject.teamSize=null;
    },
    (error)=>{console.log(error)});
  }
  onDeleteClick(event,index:number){
    this.deleteProject.projectID=this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
    this.deleteIndex=index;


  }
  onDeleteConfirm(){
this.projctService.deleteProject(this.deleteProject.projectID).subscribe(
  (response)=>{
    this.projects.slice(this.deleteIndex,1);
    this.deleteProject.dateOfStart=null;
    this.deleteProject.projectID=null;
    this.deleteProject.projectName=null;
    this.deleteProject.teamSize=null;
  },
  (error)=>{
    console.log(error);}
    
);
  }
onSearchClick():void{
this.projctService.searchProject(this.searchBy,this.searchText).subscribe(
  (response:Project[])=>{
    this.projects=response;
  },
  (error:any)=>{
    console.log(error);
  }
 );
}

  clearFields():void{
    this.newProject.dateOfStart=null;
    this.newProject.projectID=null;
    this.newProject.projectName=null;
    this.newProject.teamSize=null;
  }

}
