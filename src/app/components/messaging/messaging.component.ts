import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SidenavService } from '../../_services/sidenav.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: any[] = [];
  subscription: Subscription;
  messagingSidenavOpened: boolean = false;
  activeTab: number = 1;

  constructor(private SidenavService: SidenavService) {}

  indexChanged(event) {
    this.activeTab = event;
    this.SidenavService.setActiveMessagingTab(event);
  }

  ngOnInit() {
    this.SidenavService.getActiveMessagingTab().subscribe(data => {
      this.activeTab = data;
      // console.log(data, this);
    });
  }
}

// TODO: wireframe 3/5 mobile & desktop
// TODO: respond to requests
// TODO: tests

// TODO: click on a request, move open the tooltip

// responders list in  "My requests" tab
// Respond to Request : 1st click -> respond and go to messages
//                      2nd click -> go to messages

// TODO: published field boolean

// TODO: After 24 hours the request expires.  If, within 24 hours, the request still hasn't been marked as fulfilled, the requester can republish it.
// TODO: hide request after 5 fullfliments
// TODO: Counter unfllfiled requests
// TODO: requests / fullfillments stats
// TODO: sign up

// TODO: list of volunteers in marker tooltip

// TODO:

// TODO: controller test cases
