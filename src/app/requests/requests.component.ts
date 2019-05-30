import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

import { HelpRequestsService } from '../_services/help-requests.service';
import { SidenavService } from '../_services/sidenav.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsComponent implements OnInit {
  respondToRequest(id) {
    this.SidenavService.setExpanded(id);
    this.SidenavService.setRequestSidenavOpened(false);
    this.SidenavService.setMessagingSidenavOpened(true);
  }
  requests: any[] = [];
  subscription: Subscription;

  constructor(
    private helpRequestsService: HelpRequestsService,
    private SidenavService: SidenavService
  ) {
    this.subscription = this.helpRequestsService
      .getInboundRequestsList()
      .subscribe(message => {
        if (message) {
          this.requests = [];
          this.requests = message.requests;
          // this.requests.push(message);
          // console.log(message);
        } else {
          // clear requests when empty message received
          this.requests = [];
        }
      });
  }
  ngOnInit() {}
}
