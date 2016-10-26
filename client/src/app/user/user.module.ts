import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserService} from "./user.service";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MaterialModule.forRoot(),
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UserModule { }
