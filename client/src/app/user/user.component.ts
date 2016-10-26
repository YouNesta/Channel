import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;
    updateProfile = false;


  constructor(private service: UserService) {
    var user = this.service.getUser();
    this.user = new User(user.pseudo, user.email, user.firstName, user.lastName, user.phone, user.channels, user._id, user.token)
  }

  ngOnInit() {

  }

  youtubeConnect(){
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=212999642554-2k9efbm49nti014rhlb10f104siprq8h.apps.googleusercontent.com&redirect_uri=http://localhost:4200/oauth2callback&scope=https://www.googleapis.com/auth/youtube&response_type=code&access_type=offline';
  }

}
