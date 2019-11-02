import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Globals } from '../../../assets/globals';
import { AidRequest } from '../../models/aidRequest.model';
import * as fromStore from '../../store';
import { HelpRequestsService } from '../../_services/help-requests.service';
import { MessageFlowService } from '../../_services/message-flow.service';
import { SidenavService } from '../../_services/sidenav.service';

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkersListComponent implements OnInit {
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];
  subscription: Subscription;

  current_user = Globals.id;

  respondToRequest(id) {
    // TODO: we need a POST request here
    this.MessageFlowService.respondToRequest(id);

    // if everything goes well,
    // continue with the rest
    // this.SidenavService.setExpandedAccordionPanel(id);
    // this.SidenavService.setSidenavOpen(false);
    // this.SidenavService.setMessagingSidenavOpened(true);
    // this.SidenavService.setActiveSidenavTab(0);
  }

  constructor(
    private store: Store<fromStore.PlatformState>,
    private helpRequestsService: HelpRequestsService,
    private SidenavService: SidenavService,
    private MessageFlowService: MessageFlowService
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
