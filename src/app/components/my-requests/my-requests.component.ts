import { Component, OnInit, Input } from '@angular/core';
import { HelpRequestsService } from '../../_services/help-requests.service';

import { Message } from '../../models/message.model';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from '../../store';

import { Globals } from '../../../assets/globals';
import { AidRequest } from '../../models/aidRequest.model';
import { SidenavService } from '../../_services/sidenav.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  @Input() activeTab: number;

  myRequests: any[] = [];
  myRequestsLength: number;
  current_user = Globals.id;
  subscription: Subscription;
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];
  activeThread: Number;
  activeMessagingTab: number;
  showMessages: boolean;
  chat$: object;
  responder_id: number;

  constructor(
    private store: Store<fromStore.PlatformState>, // public globals: Globals
    private sidenavService: SidenavService,
    private helpRequestsService: HelpRequestsService
  ) {}

  handleShowMessages(request_id, responder_id) {
    this.activeThread = request_id;
    this.responder_id = responder_id;
    this.sidenavService.setActiveSidenavTab(1);
    this.sidenavService.setOpenChat(true);
    // console.log(this);
  }

  ngOnInit() {
    this.sidenavService.getOpenChat().subscribe(open => {
      if (this.activeTab !== 2) return null;

      console.log('this.activeMessagingTab', this);

      this.store.dispatch(new fromStore.LoadMessages(this.current_user));

      this.store
        .select(fromStore.getChatForResponder, {
          request_id: this.activeThread,
          responder_id: this.responder_id
        })
        .subscribe(data => {
          this.chat$ = data;
        });

      console.log(open, this, this.chat$);
      this.showMessages = open;
      console.log('--------------------------------------------------');
    });

    this.requests$ = this.store.select(fromStore.getUserRequests);

    this.requests$.subscribe(data => {
      this.myRequestsLength = data.length;
      console.log('fromStore.getUserRequests', data);
    });

    // this.store
    //   .select(fromStore.getChatForResponder, {
    //     request_id: this.request_id,
    //     responder: 2
    //   })
    //   .subscribe(data => {
    //     console.log('getChatForResponder', data);
    //   });

    // .subscribe(state => {
    //   // console.log(Globals);
    //   this.requests = state
    //     .map(item => ({
    //       ...item
    //     }))
    //     .filter(r => {
    //       return r.owner_id == this.current_user;
    //     });
    //   console.log('user requests', this.requests);
    // });

    // this.store.dispatch(new fromStore.LoadMyRequests(this.current_user));
  }
}
