import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';

  constructor(@Inject('authService') private authService) {
  }

  ngOnInit() {
  }

  onClick() {
    console.log(this.authService.loginWithCredentials(this.userName, this.password));
  }

  onSubmit(formValue){
    console.log(formValue);
  }
}
