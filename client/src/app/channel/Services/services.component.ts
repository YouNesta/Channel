import { Component, OnInit } from '@angular/core';
import {ChannelService} from "../channel.service";
import {FilterPipe} from "../../pipe/filter.pipe";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']

})
export class ServicesComponent implements OnInit {

  trustedServices = {
    "youtube": false,
    "hgfhgf": false
  };
  services= [];

  constructor(private http: ChannelService) {
    this.services = this.http.getServices();
  }


    ngOnInit() {
  }

}
