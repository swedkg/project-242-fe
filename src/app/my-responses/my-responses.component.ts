import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageFlowService } from '../_services/message-flow.service';
import { HelpRequestsService } from '../_services/help-requests.service';

import { Globals } from '../../assets/globals';

@Component({
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.scss']
})
export class MyResponsesComponent implements OnInit {
  allResponses: any[] = [];
  myResponses: any[] = [];
  myResponsesIDs: any[] = [];
  myResponsesList: any[] = [];
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  current_user = this.globals.current_user;
  constructor(
    private messageFlowService: MessageFlowService,
    private helpRequestsService: HelpRequestsService,
    public globals: Globals
  ) {}

  buildMyResponsesList() {
    let responsesList = this.groupResponses(this.myResponses);
    for (let prop in responsesList) {
      let requestThread = responsesList[prop];
      let thread = requestThread[0];
      let title = this.getRequestTitle(thread.request_id);

      let requestersMessages = this.getRequestersMessages(
        thread.request_id,
        thread.requester_id
      );

      let messageFlow = requestThread.concat(requestersMessages);
      messageFlow = this.sortMessages(messageFlow);

      this.myResponsesList.push({ title, messageFlow });
    }

    console.log(this.myResponsesList);
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

  ngOnInit() {
    this.messageFlow = this.messageFlowService
      .getAllResponseRequests()
      .subscribe(responses => {
        if (responses) {
          this.myResponses = [];
          this.allResponses = responses;
          this.myResponses = responses;
          this.myResponses = responses.filter(res => {
            return (
              res.user_id === this.current_user &&
              res.requester_id !== res.user_id
            );
          });
          console.log(this.myResponses);
        } else {
          console.log('none found');
        }
      });
    this.allRequests = this.helpRequestsService
      .getAllRequestsFromJSON()
      .subscribe(data => {
        this.requests = data;
        this.buildMyResponsesList();
        // console.log('getAllRequestsFromJSON', this.requests);

        // this.allRequests;
        // this.allRequests = this.allRequests.filter(el => el.fulfilled === false);
      });
    this.helpRequestsService.getRequestList().subscribe(data => {
      // let newRequest = data.request;
      // this.markers.push(newRequest);
      this.requests = data.requests;
      this.requests = this.requests.filter(res => {
        return res.isUser === false;
      });
      // TODO: build/rebuild responses list
      this.buildMyResponsesList();
      // console.log('getRequestList', this.requests, data);
    });

    console.log(this);
  }
}