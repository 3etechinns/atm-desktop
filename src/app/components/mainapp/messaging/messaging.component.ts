import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { DataService } from '../../../providers/data.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  unreadCount = 0;

  constructor(private authSvc: AuthService, private dataSvc: DataService) {}

  ngOnInit() {}
}
