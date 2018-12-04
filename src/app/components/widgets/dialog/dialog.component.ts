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
    $('#myModal').modal(options$);
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
