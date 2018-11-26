import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../domain/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';
  auth: Auth;

  constructor(
    @Inject('authService') private authService, 
    private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(formValue){
    this.authService
    .loginWithCredentials(formValue.login.userName, formValue.login.password)
    .subscribe(auth => {
      debugger
      let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
      if(!auth.hasError){
        this.router.navigate([redirectUrl]);
        localStorage.removeItem('redirectUrl');
      } else {
        this.auth = Object.assign({}, auth);
      }
    });
  }
}
