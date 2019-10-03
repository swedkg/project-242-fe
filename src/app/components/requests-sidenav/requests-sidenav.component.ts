import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import { HelpRequestsService } from '../../_services/help-requests.service';
import { SidenavService } from '../../_services/sidenav.service';
import { AidRequest } from '../../models/aidRequest.model';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-requests-sidenav',
  templateUrl: './requests-sidenav.component.html',
  styleUrls: ['./requests-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsComponent implements OnInit {
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];
  subscription: Subscription;

  current_user = Globals.id;

  respondToRequest(id) {
    this.SidenavService.setExpanded(id);
    this.SidenavService.setRequestSidenavOpened(false);
    this.SidenavService.setMessagingSidenavOpened(true);
    this.SidenavService.setActiveMessagingTab(0);
  }

  constructor(
    private store: Store<fromStore.PlatformState>,
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
  ngOnInit() {
    // this.store.select(fromStore.getAllRequests).subscribe(state => {
    //   console.log(state);
    // });
    // this.requests$ = this.store.select(fromStore.getAllRequests);
    // this.store.dispatch(new fromStore.LoadRequests());
  }
}
