import { Component, OnInit } from '@angular/core';
import { HelpRequestsService } from '../../_services/help-requests.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import { AidRequest } from '../../models/aidRequest.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  requests: any[] = [];

  constructor(
    private helpRequestsService: HelpRequestsService,
    private store: Store<AidRequest>
  ) {}

  ngOnInit() {
    // this.helpRequestsService.getAllRequestsFromJSON().subscribe(data => {
    //   this.requests = data;
    //   // this.buildMyResponsesList();
    //   console.log('getAllRequestsFromJSON', this.requests);
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
    //   // this.buildMyResponsesList();
    //   // console.log('getRequestList', this.requests, data);
    // });
  }
}
