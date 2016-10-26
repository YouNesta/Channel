import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {MdSidenav} from "@angular/material";

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() sidenav: MdSidenav;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  isLoggedIn(){
    return this.auth.isLoggedIn() == true;
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }

}
