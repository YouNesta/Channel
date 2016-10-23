import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth } from 'angular2-jwt';
import {RouterModule} from "@angular/router";


//Routes
import {AppRoutingModule} from "./app-routing.module";

//Module
import {UserModule} from "./User/user.module";

//Component
import { AppComponent } from './app.component';
import {AuthGuard} from "./Auth/auth.guard.service";

import {AuthService} from "./Auth/auth.service";
import { LoginComponent } from './User/Login/login.component';
import { UnauthorizedComponent } from './Unauthorized/unauthorized.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './Header/header.component';
import { HomeComponent } from './Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    UserModule,
    RouterModule
  ],
  providers: [
    provideAuth({
      headerName: "Authorization",
      headerPrefix: "Bearer ",
      tokenName: "auth_token",
      tokenGetter: (() => localStorage.getItem("auth_token")),
      globalHeaders: [{'Content-Type':'application/json'}],
      noJwtError: true,
      noTokenScheme: false
    }),
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
