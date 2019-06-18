import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AidRequest } from '../models/aidRequest.model';
import { catchError } from 'rxjs/operators';

import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}

  private requestsList = new Subject<any>();
  private inboundRequestsList = new Subject<any>();
  private newRequesst = new Subject<any>();

  addNewRequest(request) {
    this.newRequesst.next({ request });
  }

  getNewRequest(): Observable<any> {
    return this.newRequesst.asObservable();
  }

  // ---------------------------------- //

  getInboundRequestsList(): Observable<any> {
    return this.inboundRequestsList.asObservable();
  }

  sendInboundRequestList(requests) {
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

  getAllRequestsFromJSON(): Observable<any[]> {
    let url: string = '../../assets/requests.json';
    return this.http
      .get<AidRequest[]>(url)
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
    // .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
