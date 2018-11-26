import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './core/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { routing } from './app.routes';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    TodoModule
  ],
  providers: [{ provide: 'authService', useClass: AuthService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
