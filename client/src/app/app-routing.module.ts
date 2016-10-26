import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./user/login/login.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {SubscribeComponent} from "./user/subscribe/subscribe.component";
import {Oauth2callbackComponent} from "./auth/oauth2callback/oauth2callback.component";
import {AuthGuard} from "./auth/auth.guard.service";

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
