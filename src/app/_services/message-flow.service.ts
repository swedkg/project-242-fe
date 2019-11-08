import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../assets/globals';

import { Store } from '@ngrx/store';

import * as fromStore from '../store/';

const BASEURL = 'http://localhost:3000';
const MESSAGES = '/messages';
const FULLFILMENTS = '/fullfilments/';

@Injectable({
  providedIn: 'root'
})
export class MessageFlowService {
  constructor(
    private http: HttpClient,
    private store: Store<fromStore.PlatformState>
  ) {}

  private messageFlow = new Subject<any>();
  private newMessageToFullfilment = new Subject<any>();
  private responseToRequest = new Subject<number>();

  // TODO: some cleanup is needed, HTTP requests are being send on refresh
  // TODO: an observable is need to update the messages as we send a new one.

  setResponseToRequest(bool) {
    this.responseToRequest.next(bool);
  }

  getResponseToRequest() {
    return this.responseToRequest;
  }

  getAllResponseRequests(): Observable<any[]> {
    let url: string = BASEURL;
    return this.http.get<any[]>(url);
  }

  getUserMessages(id: number): Observable<any[]> {
    let url: string = BASEURL + MESSAGES + '?user_id=' + id;
    console.log(url);

    return this.http.get<any[]>(url);
  }
  getUserRequests(id: number): Observable<any[]> {
    let url: string =
      BASEURL + MESSAGES + '?requester_id=' + id + '&user_id_ne=' + id;
    // ?requester_id=3&user_id_ne=3
    console.log(url);

    return this.http.get<any[]>(url);
  }

  respondToRequest(id: number) {
    // http://localhost:3000/fullfilments/?request_id=1&user_id=1
    // user_id =
    console.log(id, Globals);
    let fullfilment = {
      request_id: id,
      user_id: Globals.id
    };

    return this.http
      .post(BASEURL + FULLFILMENTS, fullfilment, { observe: 'response' })
      .subscribe(response => {
        console.log(response, response.status);

        if (response.status === 201) {
          // this.store.dispatch(new fromStore.LoadMessages(Globals.id));
          // this.store.dispatch(new fromStore.LoadRequests());

          this.setResponseToRequest(response.status);
        } else {
          console.log('Something went wrong');
        }
        return response.status;
      });
  }

  sendMessage(newMessage) {
    //http://localhost:3000/messages/?text=I want to help&fullfilment_id=1&sender_id=2&receiver_id=1
    let url = BASEURL + MESSAGES;
    console.log(newMessage);

    return this.http
      .post(url, newMessage, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 201) {
          this.newMessageToFullfilment.next({ newMessage });
        } else {
          console.log('Something went wrong');
        }
        console.log(response, response.status);
      });
  }

  getNewMessage(): Observable<any> {
    return this.newMessageToFullfilment.asObservable();
  }

  // addNewRequest(request) {
  //   let url: string = 'http://localhost:3000/requests';

  //   console.log(request);
  //   return this.http.post(url, request, { observe: 'response' }).subscribe(
  //     response => {
  //       console.log(response, response.status);
  //       if (response.status === 201) {
  //         this.newRequesst.next({ request });
  //       } else {
  //         console.log('Something went wrong');
  //       }
  //       return response;
  //     },
  //     err => {
  //       throw err;
  //     }
  //   );
  //   // .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  // }
}
