import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: any[] = [];
  subscription: Subscription;
  constructor() {}

  ngOnInit() {}
}
