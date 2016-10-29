import {ChannelService} from "./channel.service";
export class Channel {
  id: string;
  channelId: string;
  description: string;
  thumbnail: string;
  title: string;
  url: string;
  categories: Array<string>;
  http: ChannelService;

  constructor(channel, http){
    this.http = http;
    this.id = channel._id;
    this.channelId = channel.channelId;
    this.description = channel.description;
    this.thumbnail = channel.thumbnails.medium;
    this.title = channel.title;
    this.url = channel.url;
    this.categories = channel.categories
  }


  get channelCategories(){
    return this.categories;
  }

  set channelCategories(categories){
    this.categories = categories;
    this.http.updateCategories(this)
      .subscribe(
        res => {
          if(res.success){
            console.log('YAYAYAYA')
          }
        }
      )
  }
}
