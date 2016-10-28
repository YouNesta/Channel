import { Component, OnInit } from '@angular/core';
import {ChannelService} from "./channel.service";
import {Channel} from "./channel";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels= new Array();
  categories = ['Philosophie', 'Bite', 'fjkdhdjsfh']
  options = {
    placeholder: "+ Catégorie",
    secondaryPlaceholder: "Entrez une nouvelle catégorie",
    separatorKeys: [4, 5],
    maxItems: 5
  };

  public autocompleteTags = [];
  constructor(private http: ChannelService) {
     this.http.getChannels()
        .subscribe(
          data => {
            if (data.success) {
              for (var key in data.data) {
                for(var i in data.data[key].categories){
                  if(this.categories.indexOf(data.data[key].categories[i]) != -1)
                    this.categories.push(data.data[key].categories[i])
                }
                 this.channels.push(new Channel(data.data[key], this.http));
              }
            }
          }
        )

  }
  ngOnInit() {

  }


}
