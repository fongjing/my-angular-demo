import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService) { }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    let authInfo =  this.userService
      .findUser(username, password)
      .subscribe((user: User) => {
        debugger;
        let auth = new Auth();
        localStorage.removeItem('userId');
        let redirectUrl = (localStorage.getItem('redirectUrl') === null) ?
          '/' : localStorage.getItem('redirectUrl');
        auth.redirectUrl = redirectUrl;
        if (null === user) {
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId', user.id.toString());
        } else {
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }
        return auth;
      }) as Observable<Auth>;
      return authInfo;
  }
}
