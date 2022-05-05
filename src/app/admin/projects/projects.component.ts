import { Component, OnInit } from '@angular/core';
import { Project } from '../../project';
import { ProjectsService } from '../..//projects.service';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationService } from 'src/app/client-location.service';

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
//to show the spinner
 showLoading :  boolean = true;

clientLocations : ClientLocation[] = []
  constructor(private projctService: ProjectsService,
    private clientLocationService : ClientLocationService) { }

  ngOnInit(): void {
    //will return observable of project
    //subscribe method creates observer
    this.projctService.gtAllProjects().subscribe(
      //user error function that will execute after receiving data from server
      //we are using a variable "response" of project array data type
      //this data type should be same that u have mentioned in observable
      (response:Project[])=>{ 
        this.projects=response; // assigning same to the project poperty of current component
        this.showLoading = false;
      },
      //since using intercepttor for handling errors, no need for this
      /*(error) =>{
        alert("Authentication failed");
        console.log("error");
        
      }*/
     
    );

    //we need to fetch the data, in order to bind it with the dropDown List
    this.clientLocationService.getClientLocation().subscribe(
      (response) =>{
        this.clientLocations = response;

      }
    );
   
  }

  addNewProject():void{
    this.newProject.clientLocation.clientLocationID = 0;
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
      obj.active =  response.active;
      obj.clientLocationID =  response.clientLocationID;
      obj.clientLocation = response.clientLocation;
      obj.status = response.status;
      this.projects.push(obj);
      //clear new project dialog - textBoxes

      this.newProject.dateOfStart=null;
      this.newProject.projectID=null;
      this.newProject.projectName=null;
      this.newProject.teamSize=null;
      this.newProject.active=false;
      this.newProject.status=null;
      this.newProject.clientLocationID=null;
      this.newProject.clientLocation=null;
    },
      (error:any)=>{console.log(error)});
  }
  // index:number -> to get the row for which user will clicks on edit button
  onEditClick(event:any, index:number){
    this.editProject.projectID=this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
    this.editProject.active = this.projects[index].active;
    this.editProject.status = this.projects[index].status;
    this.editProject.clientLocationID = this.projects[index].clientLocationID;
    this.editProject.clientLocation.teamSize = this.projects[index].clientLocation;
    this.editIndex=index;

  }
  updateProject(){
    this.projctService.updateProject(this.editProject).subscribe((response)=>{
      var obj: Project = new Project();
      obj.projectID = response.projectID;
      obj.projectName = response.projectName;
      obj.dateOfStart = response.dateOfStart;
      obj.teamSize = response.teamSize;
      obj.active = response.active;
      obj.clientLocationID= response.clientLocationID;
      obj.clientLocation = response.clientLocation;
      obj.status= response.status;
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
