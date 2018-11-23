import { Injectable } from '@angular/core';

import { Todo } from './todo.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  constructor() { }

  addTodo(todoItem: string): Todo[] {
    let todo: Todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false
    };
    this.todos.push(todo);
    return this.todos;
  }
}
