import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable()
export class AuthService {

  baseUrl: string = '/api';
  user: User;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`${this.baseUrl}/user`).subscribe(
      (user: User) => this.user = user
    );
  }

}
