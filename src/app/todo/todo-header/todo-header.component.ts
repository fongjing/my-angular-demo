import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue: string = '';
  @Input() placeholder: string = 'What needs to be done?';
  @Input() delay: number = 300;

  //detect the input value and output this to parent
  @Output() textChanges = new EventEmitter<string>();
  //detect the enter keyup event and output this to parent
  @Output() onEnterUp = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    const event$ = fromEvent(elementRef.nativeElement, 'keyup')
    .pipe(
      map(() => this.inputValue),
      debounceTime(this.delay),  //时间的滤波器
      distinctUntilChanged());  //筛选器
    event$.subscribe((input: string) => this.textChanges.emit(input));
  }

  ngOnInit() {
  }

  enterUp() {
    this.onEnterUp.emit(true);
    this.inputValue = '';
  }
}
