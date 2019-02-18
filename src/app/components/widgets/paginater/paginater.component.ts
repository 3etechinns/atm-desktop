import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginater',
  templateUrl: './paginater.component.html',
  styleUrls: ['./paginater.component.scss']
})
export class PaginaterComponent implements OnInit {
  @Input() last = 0;

  @Output() next = new EventEmitter<number>();

  elements: number[] = [];

  @Input()
  currentNumber = 0;

  constructor() {}

  ngOnInit() {
    for (let index = 0; index < this.last; index++) {
      this.elements.push(index);
    }
  }

  clickEvent($event) {
    this.next.emit($event);
  }
}
