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
  myRequestsLength: number;
  current_user = Globals.id;
  subscription: Subscription;
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];

  constructor(
    private store: Store<fromStore.PlatformState>, // public globals: Globals
    private helpRequestsService: HelpRequestsService
  ) {}

  ngOnInit() {
    this.requests$ = this.store.select(fromStore.getUserRequests);

    this.requests$.subscribe(data => {
      this.myRequestsLength = data.length;
      console.log('fromStore.getUserRequests', data);
    });

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
