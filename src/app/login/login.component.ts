import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../login-view-model';
import { LoginService } from '../login.service';

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

  ngOnInit(): void {
  }
  onLoginClick(event){
    console.log(this.loginView);
    this.loginService.login(this.loginView).subscribe(
      (response)=>{
        this.route.navigateByUrl("/dashboard");
      },
      (error)=>{
        this.loginError="Invalid Username or Password";
        console.log(error);
      }
    )
  }

}
