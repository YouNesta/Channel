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
import {UserModule} from "./user/user.module";

//Component
import { AppComponent } from './app.component';
import { AuthGuard } from "./auth/auth.guard.service";

import { AuthService } from "./auth/auth.service";
import { LoginComponent } from './user/login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from "./user/subscribe/subscribe.component";
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { Oauth2callbackComponent } from './auth/oauth2callback/oauth2callback.component';
import { ServicesComponent } from './channel/Services/services.component';
import {ChannelModule} from "./channel/channel.module";
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    LoginComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    SubscribeComponent,
    SidenavComponent,
    Oauth2callbackComponent,
    ServicesComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UserModule,
    RouterModule,
    ChannelModule,
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
