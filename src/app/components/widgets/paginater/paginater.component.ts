import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginater',
  templateUrl: './paginater.component.html',
  styleUrls: ['./paginater.component.scss']
})
export class PaginaterComponent implements OnInit {
  @Input() upto = 0;

  @Input() max = 0;

  @Output() next = new EventEmitter<number>();

  elements: number[] = [];

  currentNumber = 1;

  constructor() {}

  ngOnInit() {
    for (let index = 0; index < this.max; index++) {
      this.elements.push(index);
    }
  }
}
