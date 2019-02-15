import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss']
})
export class DetailBoxComponent implements OnInit {
  @Input() color: string;

  @Input() title: string;

  @Input() icon: string;

  @Input() value: string;

  @Input() percent: string;

  @Input() descText: string;

  constructor() {}

  ngOnInit() {}
}
