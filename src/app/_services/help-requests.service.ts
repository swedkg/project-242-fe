import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { AidRequest } from "../_models/aidRequest.model";
import { catchError } from "rxjs/operators";

import "rxjs/add/observable/throw";

@Injectable({
  providedIn: "root"
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}

  private requestsList = new Subject<any>();
  private inboundRequestsList = new Subject<any>();
  private fulfilled = new Subject<any>();
  private republish = new Subject<any>();

  addNewRequest(request) {
    let url: string = "http://localhost:3000/requests";

    console.log(request);

    return this.http.post(url, request, { observe: "response" }).subscribe(
      response => {
        console.log(response, response.status);
        if (response.status === 201) {
          // this.newRequesst.next({ request });
        } else {
          console.log("Something went wrong");
        }
        return response;
      },
      err => {
        throw err;
      }
    );
    // .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }

  // getNewRequest(): Observable<any> {
  //   return this.newRequesst.asObservable();
  // }

  // ---------------------------------- //

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
    let url: string = "http://localhost:3000/requests";
    return this.http
      .post<any>(url, request, { observe: "response" })
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }

  getAllRequests(): Observable<any[]> {
    let url: string = "http://localhost:3000/requests";
    return this.http
      .get<AidRequest[]>(url)
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }

  markFulfilled(request) {
    console.log("request:", request);

    let url = "http://localhost:3000/requests/" + request;
    let body = {
      fulfilled: true
    };

    return this.http
      .patch<any>(url, body, { observe: "response" })
      .subscribe(response => {
        if (response.status === 200) {
          console.log(response);
          this.setFulfilled(true);
        } else {
          console.log("Something went wrong");
        }
        // console.log(response);
      });
  }

  republishRequest(request) {
    let url = "http://localhost:3000/requests/" + request;

    let body = {
      republished: 2
    };

    return this.http
      .patch<any>(url, body, { observe: "response" })
      .subscribe(response => {
        console.log(response);

        if (response.status === 200) {
          console.log(response);
          this.setRepublish(true);
        } else {
          console.log("Something went wrong");
        }
        // console.log(response);
      });
  }
}
