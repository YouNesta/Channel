import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./User/Login/login.component";
import {UnauthorizedComponent} from "./Unauthorized/unauthorized.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./Home/home.component";

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
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      { path: '**', component: PageNotFoundComponent }

    ]),
  ]
})
export class AppRoutingModule { }
