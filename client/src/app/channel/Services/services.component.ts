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
    "hgfhgf": false,
    "hgjfjhgfgjhf": false
  };
  services= {};
  constructor(private service: ChannelService) {
    var services = this.service.getServices();

    for(var key in services){
      console.log(services[key].serviceName);
        this.services[services[key].serviceName] = services[key];
      console.log(this.services);
    }
  }

  keys() : Array<string> {
    return Object.keys(this.services);
  }
    ngOnInit() {
  }

}
