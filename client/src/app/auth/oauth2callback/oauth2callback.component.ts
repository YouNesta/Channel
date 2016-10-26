import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router}     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-oauth2callback',
  templateUrl: './oauth2callback.component.html',
  styleUrls: ['./oauth2callback.component.css']
})
export class Oauth2callbackComponent implements OnInit {
  userId: string;
  constructor(private route: ActivatedRoute, private auth: UserService, private router: Router) {}

  ngOnInit() {
    this.userId = this.auth.getUserId();

    this.route
      .queryParams
      .map(params => params['code'] || params['error'])
      .subscribe(res => {
        console.log(res)
          if(res != 'access_denied'){
            this.auth.valideYoutube(res, this.userId)
              .subscribe(
                res => {
                  if (res.success) {
                    var user = JSON.stringify(res.user)
                    localStorage.setItem('user', user);
                    this.router.navigate(['user'])
                  }
                },
                err => console.error(err),
                () => console.log('done')
              )
          }

      });


  }

}
