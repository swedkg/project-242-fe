import { Component, OnInit } from '@angular/core';
import { HelpRequestsService } from '../../_services/help-requests.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  myRequests: any[] = [];
  current_user = this.globals.current_user;

  constructor(
    private store: Store<fromStore.PlatformState>,
    public globals: Globals
  ) {}

  ngOnInit() {
    this.store.select(fromStore.getMyRequests).subscribe(state => {
      // this.myRequests = state.filter(m => {
      //   return m.requester_id === m.user_id;
      // });
      // this.buildMyResponsesList();
      // console.log('myRequests', this.myRequests, state);
    });
    this.store.dispatch(new fromStore.LoadMyRequests(this.current_user));
  }
}
