import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/todo-data.service';

import { AuthService } from './core/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { routing } from './app.routes';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryTodoDbService, { dataEncapsulation: false }
    ),
    routing
  ],
  providers: [{ provide: 'authService', useClass: AuthService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
