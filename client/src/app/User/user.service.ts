import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    private url = "http://localhost:3000/user/";

  constructor(private authHttp: AuthHttp) {

  }



  getUser(){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.url;

    return this.authHttp.get(
                url,
                options
              )
              .map((res:Response) => res.json())
  }

}
