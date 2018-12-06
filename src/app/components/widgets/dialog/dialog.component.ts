import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() showUpload;

  @Input() disableAddFile;

  @Input() title = '';

  @Input() confirmText = 'DONE';

  @Input() closeText = 'CLOSE';

  @Output() addFileListener: EventEmitter<any> = new EventEmitter();

  @Output() uploadListener: EventEmitter<any> = new EventEmitter();

  @Output() closeListener: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  show(options$) {
    $('#myModal').modal('show');
    $('#myModal').appendTo('.content-wrapper');
    $('.modal-backdrop').appendTo('.content-wrapper');

    // appending modal background inside the content-wrapper div
    // remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
  }

  close() {
    $('.content-wrapper>#myModal').remove();
    $('.content-wrapper>.modal-backdrop').remove();
  }

  onclicked() {
    this.addFileListener.emit('');
  }

  onupload() {
    this.uploadListener.emit('');
  }

  onclose() {
    this.closeListener.emit('');
  }
}
