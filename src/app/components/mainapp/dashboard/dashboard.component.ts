import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    $('#myBox').css(
      'max-height',
      $(window).height() - $('.main-header').height() - 140
    );

    $(window).resize(function() {
      jQuery('#myBox').css(
        'max-height',
        $(window).height() - $('.main-header').height() - 140
      );
    });
  }

  ngOnDestroy() {
  }
}
