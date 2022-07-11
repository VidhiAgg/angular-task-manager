import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { RouterLoggerService } from './services/router-logger.service';
import { fadeAnimation, slideUpAnimation, zoomUpAnimation, zoomLeftAnimation, slideLeftOrRightAnimation, keyframeAnimation } from "./my-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //animations: [fadeAnimation],
  //animations: [slideUpAnimation],
 // animations : [zoomUpAnimation]
 //animations : [zoomLeftAnimation]
 //animations : [slideLeftOrRightAnimation],
 animations:[keyframeAnimation]

})
export class AppComponent {
  
  title = 'TaskManger';
  
  constructor(
    public loginService:LoginService,
    private domSanitizer : DomSanitizer,
    private roteLogger : RouterLoggerService,
    private router : Router){}
  //will display the plain text instaed of sisplaying the same as <svg> tag
//  myProperty = "<svg>blah</svg>";
//myProperty = "<script>alert(document.cookies)</script>";
//to bypass the built-in security
//this will show the <iframe> tagg and will not be blocked
//myProperty = this.domSanitizer.bypassSecurityTrustHtml("<iframe src='http://www.lipsum.com'></iframe>");
//will open google window om hello click
//myPropertyy = this.domSanitizer.bypassSecurityTrustUrl("javascript:window.open('http://www.google.com')");
//myProperty = this.domSanitizer.bypassSecurityTrustResourceUrl
//("https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg");

ngOnInit(){
  //emitt each time whenever a router event is triggerd
  this.router.events.subscribe((event) =>{
    //for identyfing the instance of a variable
    if (event instanceof NavigationEnd) {
      let userName = (this.loginService.currentUserName)?
      this.loginService.currentUserName : "anonymous";

      let logMsg = new Date().toLocaleDateString() + ":" +
      userName + "navigate to" + event.url;
      //Admin current date time: navigate to /projects
      //to log this message
      this.roteLogger.log(logMsg).subscribe;
    }

  });
}
onSearchClick()
  {
    console.log(this.loginService.currentUserName);
}
//will execute everytime the route is changed
getState(outlet : any)
{
  // true part will return current woring of route-url and passing the currently clicked route index to the MyAnimation.ts file
  return outlet.isActivated ? outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"]: "none";
}

}

