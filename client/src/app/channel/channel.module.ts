import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import {ChannelRoutingModule} from "./channel-routing.module";
import {ChannelService} from "./channel.service";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule,
    MaterialModule.forRoot(),
  ],
  providers: [ChannelService],
  declarations: [ChannelComponent]
})
export class ChannelModule { }
