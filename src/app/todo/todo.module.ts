
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routing } from './todo.routes';

import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoService } from './todo.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        TodoComponent,
        TodoFooterComponent,
        TodoHeaderComponent,
        TodoItemComponent,
        TodoListComponent
    ],
    providers: [
        { provide: 'todoService', useClass: TodoService }
    ]
})
export class TodoModule { }