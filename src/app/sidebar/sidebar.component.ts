import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

import { HelpRequestsService } from '../_services/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  messages: any[] = [];
  subscription: Subscription;
  constructor(private helpRequestsService: HelpRequestsService) {
    this.subscription = this.helpRequestsService
      .getMessage()
      .subscribe(message => {
        if (message) {
          this.messages = [];
          this.messages = message.requests;
          // this.messages.push(message);
          console.log(message);
        } else {
          // clear messages when empty message received
          this.messages = [];
        }
      });
  }

  ngOnInit() {}
}
