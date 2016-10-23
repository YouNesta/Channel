import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../Auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public model = {
    pseudo: "",
    password: ""
  };

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    if(this.auth.isLoggedIn()) this.router.navigate(['']) ;
  }

  login(){
    this.auth.login("younes@gmail.com", "lalala")
      .subscribe(
        res => {
            if (res.success) {
              localStorage.setItem('auth_token', res.auth_token);
              this.router.navigate(['users'])
            }
         },
        err => console.error(err),
        () => console.log('done')
      );

  }
}
