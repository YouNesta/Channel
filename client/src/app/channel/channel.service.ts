import { Injectable } from '@angular/core';
import {config} from "../../environments/environment";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Channel} from "./channel";

@Injectable()
export class ChannelService {
  private url = config.apiURL+'/channel';

  constructor(private http: Http) { }

  getServices(){
    var services = JSON.parse(localStorage.getItem('user')).services;
    return services;
  }

  getChannels(){
    var jwt = localStorage.getItem('auth_token');

    var headers = new Headers();
    if(jwt) {
      headers.append('Authorization', 'Bearer ' + jwt);
    }
      headers.append('Content-Type', 'application/json');

    return this.http
      .get(
        this.url,
     {headers: headers}
      )
      .map((res:Response) => res.json())
  }

  updateCategories(channel: Channel){
    var categories = channel.channelCategories;
    var id = channel.id;

    var jwt = localStorage.getItem('auth_token');
    var headers = new Headers();
    if(jwt) {
      headers.append('Authorization', 'Bearer '+jwt);
    }
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ categories, id });

    return this.http
      .post(
        this.url+'/update/categories',
        body,
        {headers: headers}
      )
      .map((res:Response) => res.json())
  }

}
