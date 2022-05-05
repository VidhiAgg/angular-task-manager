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
    public loginService:LoginService,
    private domSanitizer : DomSanitizer){}
  //will display the plain text instaed of sisplaying the same as <svg> tag
//  myProperty = "<svg>blah</svg>";
//myProperty = "<script>alert(document.cookies)</script>";
//to bypass the built-in security
//this will show the <iframe> tagg and will not be blocked
//myProperty = this.domSanitizer.bypassSecurityTrustHtml("<iframe src='http://www.lipsum.com'></iframe>");
//will open google window om hello click
//myPropertyy = this.domSanitizer.bypassSecurityTrustUrl("javascript:window.open('http://www.google.com')");
//myProperty = this.domSanitizer.bypassSecurityTrustResourceUrl("https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg");

  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }
}
