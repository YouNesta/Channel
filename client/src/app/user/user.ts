import {Channel} from "../channel/channel";
export class User {
  id?: string;
  pseudo: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  channels?: Channel[];
  token?: [{
    service: string,
    token: string,
    refreshToken: string,
    token_type : string,
    expires_in : string
  }];

  constructor(pseudo: string, email: string, firstName: string, lastName: string, phone: string, channels?: Channel[], id?: string, token?: [{
      service: string,
      token: string,
      refreshToken: string,
      token_type : string,
      expires_in : string
    }]){
    this.pseudo = pseudo;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.channels = channels;
    this.id = id;
    this.token = token;
  }
}
