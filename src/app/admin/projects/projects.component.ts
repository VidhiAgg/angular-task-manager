import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Project } from '../../project';
import { ProjectsService } from '../..//projects.service';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationService } from 'src/app/client-location.service';
import { NgForm } from '@angular/forms';
import *as $ from "jquery";
import { ProjectComponent } from '../project/project.component';
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

 //in order to access the newForm based on the refernce name in component, we have to use viewChild.

 @ViewChild("newForm") newForm: NgForm; //property "newForm" is used to access the <form>tag, whichh is already created in  the template,
 // so that we can access all methd and property

 @ViewChild("editForm") editForm: NgForm;



//Adding a viewChild property that refers toggleDetails
//@ViewChild("toggleDetail") toggleDetail: ProjectComponent; //for single instance only

/*
* creating multiple instances of the child component
* when we will call toggleDetail we will represent all the instance
*of the child and QueryList is used for that
*/
//@ViewChildren("toggleDetail") toggleDetail:QueryList <ProjectComponent>;

clientLocations : ClientLocation[] = []
  constructor(private projectService: ProjectsService,
    private clientLocationService : ClientLocationService) { }

  ngOnInit(): void {
    //will return observable of project
    //subscribe method creates observer
    this.projectService.gtAllProjects().subscribe(
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
  @ViewChild("#edPrjName") edPrjName : ElementRef;
  setFocus(){
    setTimeout(() =>{
      this.edPrjName.nativeElement.focus();
  },600);
  }

  @ViewChild("prjID") prjID : ElementRef;  

/*
nativeElement represents the actual object as per browser DOM
*/
  onNewClick(event){
    this.newForm.resetForm();
    setTimeout(() =>{
        this.prjID.nativeElement.focus();
    },600);
  }
  onSaveClick()
  {
    if (this.newForm.valid)
    {
      this.newProject.clientLocation.clientLocationID = 0;
      this.projectService.insertProject(this.newProject).subscribe((response) =>
      {
        //Add Project to Grid
        var p: Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.clientLocation = response.clientLocation;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;
        this.projects.push(p);

        //Clear New Project Dialog - TextBoxes
        this.newProject.projectID = null;
        this.newProject.projectName = null;
        this.newProject.dateOfStart = null;
        this.newProject.teamSize = null;
        this.newProject.active = false;
        this.newProject.clientLocationID = null;
        this.newProject.status = null;

        $("#newFormCancel").trigger("click");
      }, (error) =>
      {
        console.log(error);
      });
    }
  }


  addNewProject():void{

    if (this.newForm.valid) {
      this.newProject.clientLocation.clientLocationID = 0;
    this.projectService.insertProject(this.newProject).subscribe((response)=>{
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

      $("#newFormCancel").trigger("click");
    },
      (error:any)=>{console.log(error)});
    }
    
  }
 
  
  // index:number -> to get the row for which user will clicks on edit button
  onEditClick(event:any, index:number){
    this.setFocus();

    this.editForm.resetForm();
    
    setTimeout(() => {
    this.editProject.projectID=this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
    this.editProject.active = this.projects[index].active;
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.status = this.projects[index].status;
    this.editProject.clientLocationID = this.projects[index].clientLocationID;
    this.editProject.clientLocation.teamSize = this.projects[index].clientLocation;
    this.editIndex=index;
    this.edPrjName.nativeElement.focus();

    }, 100);
  }
  updateProject(){
    if (this.editForm.valid) {
      this.projectService.updateProject(this.editProject).subscribe((response : Project)=>{
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

        $("#editFormCancel").trigger("click");
  
      },
      (error)=>{console.log(error)});
    }
  }
  onDeleteClick(event: any,index:number){
    this.deleteIndex=index;
    this.deleteProject.projectID=this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;

    


  }
  onDeleteConfirm(){
this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
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
this.projectService.gtAllProjects().subscribe(
  (response: Project[]) =>
  {
    this.projects = response;
  });
  }
onSearchClick():void{
  if(this.searchBy == null && this.searchText == null)
  {
    this.projectService.gtAllProjects().subscribe((response: Project[])=>
    {
      this.projects = response;
    },
    (error:any)=>{
      console.log(error);
    }
    );
  }
else
{
  this.projectService.searchProject(this.searchBy,this.searchText).subscribe(
  (response:Project[])=>{
    this.projects=response;
  },
  (error:any)=>{
    console.log(error);
  }
 );
}
}

/*onHideShowDetails(event){
  //this.toggleDetail.toggleDetails()
  let projectDetails = this.toggleDetail.toArray();
  for (let i = 0; i <projectDetails.length; i++) {
    projectDetails[i].toggleDetails();
    
  }
}*/
onHideShowDetails(event){
  this.projectService.toggleDetails();
}

//fpr gloabal checkbox
isAllChecked: boolean = false;
//for accesing all instance of child
@ViewChildren("toggleDetail") projs:QueryList <ProjectComponent>;

isAllCheckedChange(event : any)
{
  let proj = this.projs.toArray();
  for (let i = 0; i <proj.length; i++) {
    proj[i].isAllChecked(this.isAllChecked);
}
}


  clearFields():void{
    this.newProject.dateOfStart=null;
    this.newProject.projectID=null;
    this.newProject.projectName=null;
    this.newProject.teamSize=null;
  }


  

}
