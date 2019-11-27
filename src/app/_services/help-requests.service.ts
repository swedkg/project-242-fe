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
  // private newRequesst = new Subject<any>();

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
}
