import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  addTodo() {
    let desc = this.desc.trim();
    if (!desc) { return; }
    this.todoService
      .addTodo(desc)
      .subscribe(todo => {
        this.todos.push(todo);
        this.desc = '';
      });
  }

  toggleTodo(todo: Todo) {
    debugger;
    const i = this.todos.indexOf(todo);    
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.todoService
      .toggleTodo(updatedTodo)
      .subscribe(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
      });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.todoService
      .deleteTodoById(todo.id)
      .subscribe(() => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)
        ];
      });
  }

  getTodos(): void {
    this.todoService
      .getTodos()
      .subscribe(todos => this.todos = [...todos]);
  }
}
