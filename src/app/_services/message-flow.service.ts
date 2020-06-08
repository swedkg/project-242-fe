import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../_services/user.service";
import { host } from "./host";

import { SnackbarService } from "./snackbar.service";

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
    private UserService: UserService,
    private SnackbarService: SnackbarService
  ) {}

  private responseToRequest = new Subject<number>();

  private platformStatusChannelMessage = new BehaviorSubject<any>({});

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

  getUserMessages(id: number): Observable<any[]> {
    let current_user = this.UserService.currentUserDetails;
    let url: string = BASEURL + MESSAGES + "?user_id=" + id;

    const httpOptions = {
      headers: new HttpHeaders({
        "X-User-Email": current_user.email,
        "X-User-Token": current_user.authentication_token,
      }),
    };

    // return this.http.get<any[]>(url, httpOptions);
    return this.http.get<any[]>(url);
  }

  removeResponder(fullfilment) {
    // console.log("fullfilment:", fullfilment);

    let url = BASEURL + FULLFILMENTS + "/" + fullfilment.id;

    return this.http
      .delete(url, { observe: "response" })
      .subscribe((response) => {
        if (response.status === 200) {
          this.SnackbarService.show("The responder was removed");
        } else {
          this.SnackbarService.show("Please try again later");
        }
      });
  }

  respondToRequest(id: number) {
    let current_user = this.UserService.currentUserDetails;
    let fullfilment = {
      request_id: id,
      user_id: current_user.id,
      status: true,
    };

    return this.http
      .post(BASEURL + FULLFILMENTS, fullfilment, { observe: "response" })
      .subscribe((response) => {
        // console.log(response, response.status);

        if (response.status === 201) {
          this.setResponseToRequest(response.status);
        } else {
          // console.log("Something went wrong");
        }
        return response.status;
      });
  }

  createMessage(message): Observable<any> {
    let url = BASEURL + MESSAGES;
    // console.log(message);
    return this.http
      .post<any>(url, message, { observe: "response" })
      .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  }
}
