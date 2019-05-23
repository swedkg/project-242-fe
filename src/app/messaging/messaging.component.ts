import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageFlowService } from '../_services/index';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: any[] = [];
  subscription: Subscription;
  constructor(private messageFlowService: MessageFlowService) {
    this.subscription = this.messageFlowService
      .getAllMessages()
      .subscribe(message => {
        if (message) {
          this.messages = [];
          // this.messages = message.messages;
          // this.messages.push(message);
          console.log(message);
        } else {
          // clear messages when empty message received
          console.log(message);
          this.messages = [];
        }
      });
  }

  ngOnInit() {}
}
