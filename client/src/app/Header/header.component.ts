import { Component, OnInit } from '@angular/core';
import {AuthService} from "../Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  isLoggedIn(){
    console.log(this.auth.isLoggedIn())
    return this.auth.isLoggedIn() == true;
  }
  logout(){
    this.router.navigate([''])
  }

}
