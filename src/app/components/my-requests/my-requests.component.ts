import { Component, OnInit } from '@angular/core';
import { HelpRequestsService } from '../../_services/help-requests.service';

import { Message } from '../../models/message.model';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from '../../store';

import { Globals } from '../../../assets/globals';
import { AidRequest } from '../../models/aidRequest.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  myRequests: any[] = [];
  current_user = Globals.id;
  subscription: Subscription;
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];

  constructor(
    private store: Store<fromStore.PlatformState>, // public globals: Globals
    private helpRequestsService: HelpRequestsService
  ) {
    this.subscription = this.helpRequestsService
      .getInboundRequestsList()
      .subscribe(message => {
        if (message) {
          this.requests = [];
          this.requests = message.requests;
          this.requests = this.requests.filter(m => {
            return m.owner_id === this.current_user;
          });
          // this.requests.push(message);
          console.log('--------->', this.requests);
        } else {
          // clear requests when empty message received
          this.requests = [];
        }
      });
  }

  ngOnInit() {
    // this.store.select(fromStore.getAllRequests).subscribe(state => {
    //   console.log(Globals);
    //   this.myRequests = state.filter(m => {
    //     return m.owner_id === this.current_user;
    //   });
    //   // this.buildMyResponsesList();
    //   console.log('myRequests', this.myRequests, state);
    // });
    // this.store.dispatch(new fromStore.LoadMyRequests(this.current_user));
  }
}
