import { Injectable } from '@angular/core';
import {config} from "../../environments/environment";
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ChannelService {
  private url = config.apiURL;

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
        this.url+'/channel',
     {headers: headers}
      )
      .map((res:Response) => res.json())
      .subscribe(
        data => (
          console.log(data)
        )
      )


  }

}
