import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../_services/sidenav.service';
import { ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import { Message } from '../../models/message.model';

import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyResponsesComponent implements OnInit {
  myResponses$: Observable<Message>;
  allResponses: any[] = [];
  myResponses: any[] = [];
  myResponsesIDs: any[] = [];
  myResponsesList: any[] = [];
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  showMessages: boolean = false;
  current_user = this.globals.current_user;
  expanded = 0;
  constructor(
    private sidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>,
    public globals: Globals
  ) {}

  buildMyResponsesList() {
    if (this.myResponses.length * this.requests.length == 0) return null;
    this.myResponsesList = [];
    let responsesList = this.groupResponses(this.myResponses);
    for (let prop in responsesList) {
      let requestThread = responsesList[prop];
      let thread = requestThread[0];
      let title = this.getRequestTitle(thread.request_id);
      let description = this.getRequestDescription(thread.request_id);
      let request_id = thread.request_id;

      let requestersMessages = this.getRequestersMessages(
        thread.request_id,
        thread.requester_id
      );

      let messageFlow = requestThread.concat(requestersMessages);
      messageFlow = this.sortMessages(messageFlow);

      this.myResponsesList.push({
        title,
        description,
        request_id,
        messageFlow
      });
    }

    // console.log(this.myResponsesList);
  }

  getRequestersMessages(requestID, requesterID) {
    let filter = this.allResponses.filter(res => {
      return (
        res.request_id === requestID &&
        res.requester_id === requesterID &&
        res.user_id === requesterID
      );
    });
    // console.log(filter);
    return filter;
  }

  groupResponses(list) {
    return list.reduce(function(r, a) {
      r[a.request_id] = r[a.request_id] || [];
      r[a.request_id].push(a);
      return r;
    }, Object.create(null));
  }

  getRequestTitle(request_id) {
    let request = this.requests.filter(res => {
      return res.id === request_id;
    })[0];
    return request.title;
  }
  getRequestDescription(request_id) {
    let request = this.requests.filter(res => {
      return res.id === request_id;
    })[0];
    return request.description;
  }

  sortMessages(requestThread) {
    return requestThread.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
  }

  buildMyResponseItem(response) {
    return {
      message: response.message,
      timestamp: response.timestamp,
      dateFormatted: response.dateFormatted
    };
  }

  handleShowMessages() {
    this.showMessages = !this.showMessages;
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadRequests());
    this.store.dispatch(new fromStore.LoadMyResponses(this.current_user));
    // this.messageFlow = this.messageFlowService
    //   .getAllResponseRequests()
    //   .subscribe(responses => {
    //     if (responses) {
    //       this.myResponses = [];
    //       this.allResponses = responses;
    //       this.myResponses = responses;
    //       this.myResponses = responses.filter(res => {
    //         return (
    //           res.user_id === this.current_user &&
    //           res.requester_id !== res.user_id
    //         );
    //       });
    //       // console.log(this.myResponses);
    //     } else {
    //       console.log('none found');
    //     }
    //   });
    // this.helpRequestsService.getAllRequests().subscribe(data => {
    //   this.requests = data;
    //   this.buildMyResponsesList();
    //   console.log('getAllRequests', this.requests);

    //   // this.allRequests;
    //   // this.allRequests = this.allRequests.filter(el => el.fulfilled === false);
    // });
    // this.helpRequestsService.getRequestList().subscribe(data => {
    //   // let newRequest = data.request;
    //   // this.markers.push(newRequest);
    //   this.requests = data.requests;
    //   this.requests = this.requests.filter(res => {
    //     return res.isUser === false;
    //   });
    //   // TODO: this and the above have to be a single call to the API
    //   this.buildMyResponsesList();
    //   // console.log('getRequestList', this.requests, data);
    // });
    this.sidenavService.getExpanded().subscribe(data => {
      this.expanded = data;

      // let title = this.getRequestTitle(data);
      // console.log('title', title);
    });
    // console.log(this);
    this.store.select(fromStore.getAllRequests).subscribe(state => {
      this.allResponses = state;
      this.requests = state;
      // this.requests = state.filter(res => {
      //   return res.isUser === false;
      // });
      // if (this.myResponses.length > 0 && this.requests.length > 0)
      this.buildMyResponsesList();
      // console.log(state, this.requests);
    });
    this.store.select(fromStore.getMyResponses).subscribe(state => {
      this.myResponses = state;
      // this.myResponses = state.filter(m => {
      //   return m.requester_id != m.user_id;
      // });
      // if (this.myResponses.length > 0 && this.requests.length > 0)
      this.buildMyResponsesList();
      // console.log(state, this.myResponses);
    });
  }
}
