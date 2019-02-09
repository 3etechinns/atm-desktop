import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-box',
  templateUrl: './small-box.component.html',
  styleUrls: ['./small-box.component.scss']
})
export class SmallBoxComponent implements OnInit {
  @Input()
  color: string;

  @Input()
  title: string;

  @Input()
  value: string;

  @Input()
  icon: string;

  @Input()
  moreText: string;

  @Input()
  moreTextLink: string;

  constructor() {}

  ngOnInit() {}
}
