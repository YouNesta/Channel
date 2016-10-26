import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { tokenNotExpired } from 'angular2-jwt';
import {config} from "../../environments/environment";
import {User} from "../user/user";

@Injectable()
export class AuthService {
  private url = config.apiURL;

  constructor(private http: Http) {
  }

  login(email: String, password: String) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ email, password });


      return this.http
      .post(
        this.url+'/user/login',
        body,
        {headers: headers}
      )
      .map((res:Response) => res.json())


  }

  subscribe(user:User, password: String) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ user, password });


    return this.http
      .post(
        this.url+'/user/subscribe',
        body,
        {headers: headers}
      )
      .map((res:Response) => res.json())


  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return tokenNotExpired('auth_token');
  }



  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
