import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, ReplaySubject, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import * as fromStore from "../store/";
import { UserService } from "../_services/user.service";

import { host } from "./host";

const BASEURL = host + "";
const MESSAGES = "/messages";
const FULLFILMENTS = "/fullfilments/";

// let current_user: User;

@Injectable({
  providedIn: "root",
})
export class MessageFlowService {
  constructor(
    private http: HttpClient,
    // private HttpHeaders: HttpHeaders,
    private store: Store<fromStore.PlatformState>,
    private UserService: UserService
  ) {}

  private responseToRequest = new Subject<number>();
  private removedResponder = new Subject<number>();

  private platformStatusChannelMessage = new BehaviorSubject<any>({});

  // TODO: some cleanup is needed, HTTP requests are being send on refresh
  // TODO: an observable is need to update the messages as we send a new one.

  setPlatformStatusChannelMessage(status) {
    this.platformStatusChannelMessage.next(status);
  }

  getPlatformStatusChannelMessage() {
    return this.platformStatusChannelMessage.asObservable();
  }

  setResponseToRequest(bool) {
    this.responseToRequest.next(bool);
  }

  getResponseToRequest() {
    return this.responseToRequest.asObservable();
  }

  getAllResponseRequests(): Observable<any[]> {
    let url: string = BASEURL;
    return this.http.get<any[]>(url);
  }

  getUserMessages(id: number): Observable<any[]> {
    let current_user = this.UserService.currentUserDetails;
    let url: string = BASEURL + MESSAGES + "?user_id=" + id;

    const httpOptions = {
      headers: new HttpHeaders({
        "X-User-Email": current_user.email,
        "X-User-Token": current_user.authentication_token,
      }),
    };

    console.log("----------------------------->", url, current_user);

    // return this.http.get<any[]>(url, httpOptions);
    return this.http.get<any[]>(url);
  }

  // getUserRequests(id: number): Observable<any[]> {
  //   let url: string =
  //     BASEURL + MESSAGES + "?requester_id=" + id + "&user_id_ne=" + id;
  //   // ?requester_id=3&user_id_ne=3
  //   console.log(url);

  //   return this.http.get<any[]>(url);
  // }

  setRemovedResponder(bool) {
    this.removedResponder.next(bool);
  }

  getRemovedResponder() {
    return this.removedResponder;
  }

  removeResponder(fullfilment) {
    console.log("fullfilment:", fullfilment);

    let url = BASEURL + FULLFILMENTS + "/" + fullfilment.id;
    let body = {
      status: false,
    };

    return this.http
      .patch(url, body, { observe: "response" })
      .subscribe((response) => {
        if (response.status === 200) {
          this.setRemovedResponder(true);
          // this.store.dispatch(new fromStore.LoadRequests());
        } else {
          console.log("Something went wrong");
        }
        // console.log(response);
      });
  }

  respondToRequest(id: number) {
    // http://localhost:3000/fullfilments/?request_id=1&user_id=1
    // user_id =
    let current_user = this.UserService.currentUserDetails;
    let fullfilment = {
      request_id: id,
      user_id: current_user.id,
      status: true,
    };

    return this.http
      .post(BASEURL + FULLFILMENTS, fullfilment, { observe: "response" })
      .subscribe((response) => {
        console.log(response, response.status);

        if (response.status === 201) {
          this.setResponseToRequest(response.status);
        } else {
          console.log("Something went wrong");
        }
        return response.status;
      });
  }

  createMessage(message): Observable<any> {
    let url = BASEURL + MESSAGES;
    console.log(message);
    return this.http
      .post<any>(url, message, { observe: "response" })
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }
}
