import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnauthorizedInterceptorService } from './jwt-unauthorized-interceptor.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskComponent } from './task/task.component';
import { AlertDirective } from './alert.directive';
import { RepeaterDirective } from './repeater.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TaskComponent,
    AlertDirective,
    RepeaterDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    
    JwtModule.forRoot({
      config:{
        tokenGetter :() =>{
          return (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token
          :null)
        }
      }
    })
  ],
  providers: [
    //the interceptor, executes in the order in which they are added but after reciving response executes
    //in reverse order.
    {
      //simply carry forward the response to oberver
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true //to allow angular to create multiple objects
  },
  {
    //will carry forward the request to next step
    provide: HTTP_INTERCEPTORS,
    useClass: JwtUnauthorizedInterceptorService,
    multi: true //to allow angular to create multiple objects
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
