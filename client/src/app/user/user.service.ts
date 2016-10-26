import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {config} from "../../environments/environment";

@Injectable()
export class UserService {
    private url:string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http){
      this.url = config.apiURL
  }



  getUser(){
      var user = JSON.parse(localStorage.getItem('user'));
      return user;
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }
  getUserId(){
    return this.getUser()._id
  }

  valideYoutube(code: string, _id:string){
    var jwt = localStorage.getItem('auth_token');
    var headers = new Headers();
    if(jwt) {
      headers.append('Authorization', 'Bearer '+jwt);
    }
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ code, _id });
    return this.http
      .post(
        this.url+'/user/oauth',
        body,
        {headers: headers}
      )
      .map((res:Response) => res.json())
  }
}
