import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input()
  isChecked: boolean;

  @Output()
  ontoggled = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onchange(event$) {
    this.ontoggled.emit(!this.isChecked);
  }
}
