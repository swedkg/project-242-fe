import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageFlowService } from '../_services/message-flow.service';
import { HelpRequestsService } from '../_services/help-requests.service';

@Component({
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.scss']
})
export class MyResponsesComponent implements OnInit {
  responses: any[] = [];
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  user_id = 10;
  constructor(
    private messageFlowService: MessageFlowService,
    private helpRequestsService: HelpRequestsService
  ) {}

  ngOnInit() {
    this.messageFlow = this.messageFlowService
      .getAllResponseRequests()
      .subscribe(responses => {
        if (responses) {
          this.responses = [];
          this.responses = responses.filter(res => {
            return res.user_id === this.user_id;
          });
          console.log(this.responses);
        } else {
          console.log('none found');
        }
      });
    this.allRequests = this.helpRequestsService
      .getAllRequestsFromJSON()
      .subscribe(data => {
        this.requests = data;
        console.log('getAllRequestsFromJSON', this.requests);

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
      console.log('getRequestList', this.requests, data);
    });
    console.log(this);
  }
}
