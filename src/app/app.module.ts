import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './_service/auth.service';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes:Routes =[
  {path:'',component:HomeComponent},
  {path:'register',
    component:RegisterComponent
  },
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'**',redirectTo:'login'}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
