import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskManger';
  constructor(
    public loginService:LoginService){}
  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }
}
