import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {


  constructor(private http: Http) {
  }

  login(email: String, password: String) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();


    return this.http
      .post(
        'http://localhost:3000/user/login',
        JSON.stringify({ email, password }),
        options
      )
      .map((res:Response) => res.json())


  }

  logout() {
    localStorage.removeItem('auth_token');
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
