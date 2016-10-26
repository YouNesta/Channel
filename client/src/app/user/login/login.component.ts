import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {MdInput} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput: MdInput;

  public model = {
    email: "",
    password: ""
  };
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    if(this.auth.isLoggedIn()) this.router.navigate(['']) ;
    this.emailInput.focus();

  }
  onSubmit(){
    this.submitted = true;
    this.login();
  }

  login(){

    this.auth.login(this.model.email, this.model.password)
      .subscribe(
        res => {
            if (res.success) {
              localStorage.setItem('auth_token', res.auth_token);
              var user = JSON.stringify(res.user)
              localStorage.setItem('user', user);
              this.router.navigate(['user'])
            }
         },
        err => console.error(err),
        () => console.log('done')
      );

  }
}
