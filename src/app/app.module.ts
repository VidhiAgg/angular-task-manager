import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorService } from './interceptor/jwt-interceptor.service';
import { JwtUnauthorizedInterceptorService } from './interceptor/jwt-unauthorized-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    EmployeeModule,
    
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
