import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth } from 'angular2-jwt';
import {RouterModule} from "@angular/router";
import { MaterialModule } from '@angular/material';


//Routes
import {AppRoutingModule} from "./app-routing.module";

//Module
import {UserModule} from "./User/user.module";

//Component
import { AppComponent } from './app.component';
import { AuthGuard } from "./Auth/auth.guard.service";

import { AuthService } from "./Auth/auth.service";
import { LoginComponent } from './User/Login/login.component';
import { UnauthorizedComponent } from './Unauthorized/unauthorized.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './Header/header.component';
import { HomeComponent } from './Home/home.component';
import { SubscribeComponent } from "./User/Subscribe/subscribe.component";
import { SidenavComponent } from './Sidenav/sidenav.component';
import { Oauth2callbackComponent } from './Auth/oauth2callback/oauth2callback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    SubscribeComponent,
    SidenavComponent,
    Oauth2callbackComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    provideAuth({
      headerName: "Authorization",
      headerPrefix: "Bearer",
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
