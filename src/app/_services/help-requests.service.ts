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

  getInboundRequestsList(): Observable<any> {
    return this.inboundRequestsList.asObservable();
  }

  inBoundMarkersList(requests) {
    this.inboundRequestsList.next({ requests });
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
}
