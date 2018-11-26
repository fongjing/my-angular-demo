import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from '../domain/todo.model';

@Component({
  //selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc: string = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  addTodo() {
    let desc = this.desc.trim();
    if (!desc) { return; }
    this.todoService
      .addTodo(desc)
      .subscribe(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  toggleTodo(todo: Todo) {
    debugger;
    const i = this.todos.indexOf(todo);
    return this.todoService
      .toggleTodo(todo)
      .subscribe(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
        return null;
      });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    return this.todoService
      .deleteTodoById(todo.id)
      .subscribe(() => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)
        ];
      });
  }

  filterTodos(filter: string): void {
    debugger
    this.todoService
      .filterTodos(filter)
      .subscribe(todos => this.todos = [...todos]);
  }

  toggleAll() {
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }
  clearCompleted() {
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.todoService.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }
}
