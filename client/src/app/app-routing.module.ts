import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./User/Login/login.component";
import {UnauthorizedComponent} from "./Unauthorized/unauthorized.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./Home/home.component";
import {SubscribeComponent} from "./User/Subscribe/subscribe.component";
import {Oauth2callbackComponent} from "./Auth/oauth2callback/oauth2callback.component";
import {AuthGuard} from "./Auth/auth.guard.service";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent

      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'subscribe',
        component: SubscribeComponent
      },
      {
        path: 'oauth2callback',
        component: Oauth2callbackComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      { path: '**', component: PageNotFoundComponent }

    ]),
  ]
})
export class AppRoutingModule { }
