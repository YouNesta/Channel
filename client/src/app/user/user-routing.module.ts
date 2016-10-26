import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import {AuthGuard} from "../auth/auth.guard.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]

      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
