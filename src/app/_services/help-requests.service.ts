import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { AidRequest } from "../_models/aidRequest.model";
import { catchError } from "rxjs/operators";

import "rxjs/add/observable/throw";

import { host } from "./host";

@Injectable({
  providedIn: "root",
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}

  private requestsList = new Subject<any>();
  private inboundRequestsList = new Subject<any>();
  private fulfilled = new Subject<any>();
  private republish = new Subject<any>();

  getRepublish(): Observable<any> {
    return this.republish;
  }

  setRepublish(bool) {
    this.republish.next(bool);
  }

  getFulfilled(): Observable<any> {
    return this.fulfilled;
  }

  setFulfilled(bool) {
    this.fulfilled.next(bool);
  }

  getInboundRequestsList(): Observable<any> {
    return this.inboundRequestsList.asObservable();
  }

  inBoundMarkersList(requests) {
    this.inboundRequestsList.next({ requests });
  }

  // ---------------------------------- //

  getRequestList(): Observable<any> {
    return this.requestsList.asObservable();
  }

  sendRequestList(requests) {
    this.requestsList.next({ requests });
  }

  // ---------------------------------- //

  createRequest(request): Observable<any> {
    let url: string = host + "/requests";
    return this.http
      .post<any>(url, request, { observe: "response" })
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }

  getAllRequests(): Observable<any[]> {
    let url: string = host + "/requests";
    return this.http
      .get<AidRequest[]>(url)
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }

  markFulfilled(request) {
    // console.log("request:", request);

    let url = host + "/requests/" + request;
    let body = {
      fulfilled: true,
    };

    return this.http
      .patch<any>(url, body, { observe: "response" })
      .subscribe((response) => {
        if (response.status === 200) {
          // console.log(response);
          this.setFulfilled(true);
        } else {
          // console.log("Something went wrong");
        }
        // // console.log(response);
      });
  }

  republishRequest(request) {
    let url = host + "/requests/" + request;

    let body = {
      republished: 0,
    };

    return this.http
      .patch<any>(url, body, { observe: "response" })
      .subscribe((response) => {
        // console.log(response);

        if (response.status === 200) {
          // console.log(response);
          this.setRepublish(true);
        } else {
          // console.log("Something went wrong");
        }
        // // console.log(response);
      });
  }
}
