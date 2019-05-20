import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}

  private requestsList = new Subject<any>();
  private newRequesst = new Subject<any>();

  addNewRequest(request) {
    this.newRequesst.next({ request });
  }

  getNewRequest(): Observable<any> {
    return this.newRequesst.asObservable();
  }

  sendRequestList(requests) {
    this.requestsList.next({ requests });
  }

  clearMessages() {
    this.requestsList.next();
  }

  getInboundRequestsList(): Observable<any> {
    return this.requestsList.asObservable();
  }

  getAllRequests(): Observable<any[]> {
    let url: string = '../../assets/requests.json';
    return this.http.get<any[]>(url);
  }
}

// interface helpRequest {
//   lat: number;
//   lng: number;
//   quote?: string;
//   firstName?: string;
//   lastName?: string;
//   img?: string;
//   stateOfOrigin?: string;
//   cityOfOrigin?: string;
// }
