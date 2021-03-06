import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Todo } from '../domain/todo.model';
import { UUID } from 'angular2-uuid';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
  constructor(private http: HttpClient) { }

  // POST /todos
  addTodo(desc: string): Observable<Todo> {
    let todo: Todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.http.post<Todo>(this.api_url, JSON.stringify(todo), httpOptions)
      .pipe(
        tap((todo: Todo) => this.log(`added todo w/ id=${todo.id}`)),
        catchError(this.handleError<Todo>('addTodo'))
      );
  }

  // PUT /todos/:id
  toggleTodo(todo: Todo): Observable<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http
      .put<Todo>(url, updatedTodo, httpOptions)
      .pipe(
        tap(() => updatedTodo),
        catchError(this.handleError<Todo>('toggleTodo'))
      );
  }
  // DELETE /todos/:id
  deleteTodoById(todo: Todo | string): Observable<Todo> {
    const id = typeof todo === 'string' ? todo : todo.id;
    const url = `${this.api_url}/${id}`;
    return this.http
      .delete<Todo>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted todo id=${id}`)),
        catchError(this.handleError<Todo>('deleteHero'))
      );
  }
  // GET /todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api_url)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  // GET /todos?completed=true/false
  filterTodos(filter: string): Observable<Todo[]> {
    switch (filter) {
      case 'ACTIVE':
        return this.http.get<Todo[]>(`${this.api_url}?completed=false`)
          .pipe(
            tap(todos => this.log('fetched todos')),
            catchError(this.handleError('getTodos', []))
          );
      case 'COMPLETED':
        return this.http.get<Todo[]>(`${this.api_url}?completed=true`)
          .pipe(
            tap(todos => this.log('fetched todos')),
            catchError(this.handleError('getTodos', []))
          );
      default:
        return this.getTodos();
    }
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TodoService message with the MessageService */
  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }
}
