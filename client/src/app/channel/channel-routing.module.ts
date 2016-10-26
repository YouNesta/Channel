import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from "../auth/auth.guard.service";
import {ServicesComponent} from "./Services/services.component";
import {ChannelComponent} from "./channel.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'services',
        component: ServicesComponent,
        canActivate: [AuthGuard]

      },
      { path: 'channels',
        component: ChannelComponent,
        canActivate: [AuthGuard]

      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ChannelRoutingModule { }
