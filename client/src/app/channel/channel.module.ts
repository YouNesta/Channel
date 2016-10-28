import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import { ChannelRoutingModule } from "./channel-routing.module";
import { ChannelService } from "./channel.service";
import { MaterialModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule,
    MaterialModule.forRoot(),
    FormsModule,
    TagInputModule
  ],
  providers: [ChannelService],
  declarations: [ChannelComponent]
})
export class ChannelModule { }
