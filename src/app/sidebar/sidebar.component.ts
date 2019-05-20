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
  requests: any[] = [];
  subscription: Subscription;
  constructor(private helpRequestsService: HelpRequestsService) {
    this.subscription = this.helpRequestsService
      .getInboundRequestsList()
      .subscribe(message => {
        if (message) {
          this.requests = [];
          this.requests = message.requests;
          // this.requests.push(message);
          console.log(message);
        } else {
          // clear requests when empty message received
          this.requests = [];
        }
      });
  }

  ngOnInit() {}
}
