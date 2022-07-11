import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginView: LoginViewModel = new LoginViewModel();
  loginError:any;


  constructor(private loginService: LoginService,
    private route: Router) { }
    @ViewChild("userName") userName : ElementRef; 

  ngOnInit(): void {
    setTimeout(() =>{
      this.userName.nativeElement.focus();
  },600);
  }
  onLoginClick(event){
    console.log(this.loginView);
    this.loginService.login(this.loginView).subscribe(
      (response)=>{
        this.route.navigate(["/admin","dashboard"]);
      },
      (error)=>{
        this.loginError="Invalid Username or Password";
        console.log(error);
      }
    )
  }
 

}
