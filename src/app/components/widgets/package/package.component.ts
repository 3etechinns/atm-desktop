import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @Input() title: string;

  @Input() price: string;

  @Input() desc: string;

  @Input() period = 'month';

  @Input() buttonText = 'BUY NOW';

  @Input() class = 'btn-primary';

  @Output() clickEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  click() {
    this.clickEvent.emit(this.title);
  }
}
