import { Component, OnInit } from '@angular/core';
import {ChannelService} from "./channel.service";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels = [];

  constructor(private service: ChannelService) {
     this.channels = this.service.getChannels();
  }
  ngOnInit() {
  }

}
