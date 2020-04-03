import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { SnackbarService } from "./snackbar.service";
import { SidenavService } from "./sidenav.service";

import { host } from "./host";
import { ActionCableService, Channel } from "angular2-actioncable";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  subscription: Subscription;
  // private SnackbarService: SnackbarService;

  constructor(
    private http: HttpClient,
    private SnackbarService: SnackbarService,
    private SidenavService: SidenavService,
    private cableService: ActionCableService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserDetails(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn() {
    let user = this.currentUserDetails;
    // return user;
    return user ? true : false;
  }

  private saveUserToLocalStorage(user) {
    if (user && user.authentication_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  register(payload) {
    let url: string = host + "/users/";

    return this.http.post<any>(url, payload).pipe(
      map(user => {
        this.saveUserToLocalStorage(user);
        this.SnackbarService.show("Thank you for joinning in!");
        return user;
      })
    );
  }

  login(payload) {
    let url: string = host + "/sessions/";

    return this.http.post<any>(url, payload).pipe(
      map(
        user => {
          // login successful if there's a jwt token in the response
          this.saveUserToLocalStorage(user);
          this.SnackbarService.show("Login Successful");
          this.SidenavService.setSidenavOpen(true);

          // Open a connection and obtain a reference to the channel
          console.log(user.authentication_token);
          // .cable("ws://127.0.0.1:3000/cable", user.authentication_token)

          const platformStatusChannel: Channel = this.cableService
            .cable("ws://127.0.0.1:3000/cable", {
              room: user.authentication_token
            })
            .channel("PlatformStatusChannel");

          // Subscribe to incoming platform messages
          this.subscription = platformStatusChannel
            .received()
            .subscribe(status => {
              console.log("PlatformStatusChannel", status);
            });

          const messagingChannel: Channel = this.cableService
            .cable("ws://127.0.0.1:3000/cable", {
              room: user.authentication_token
            })
            .channel("MessagingChannel");

          // Subscribe to incoming platform messages
          this.subscription = messagingChannel.received().subscribe(status => {
            console.log("MessagingChannel", status);
          });

          // // document.cookie = 'COOKIE_NAME=; Max-Age=0; path=/; domain=' + location.host;

          // document.cookie =
          //   "X-Authorization=" + user.authentication_token + "; path=/";
          return user;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  logout() {
    // remove user from local storage to log user out
    let url: string = host + "/user/logout";

    return this.http.delete(url, { observe: "response" }).subscribe(
      response => {
        console.log(response, response.status);
        if (response.status === 200) {
          localStorage.removeItem("currentUser");
          this.currentUserSubject.next(null);
          this.SnackbarService.show("Logout Successful");
          this.SidenavService.setOpenChat(false);
          this.SidenavService.setActiveSidenavTab(0);
          this.SidenavService.setSidenavOpen(false);
          console.log("action cable disconnect??");

          this.cableService.disconnect("ws://127.0.0.1:3000/cable");
          // document.cookie =
          // "COOKIE_NAME=; Max-Age=0; path=/; domain=" + location.host;
          //
          // document.cookie = "X-Authorization=;Max-Age=0; path=/";
        } else {
          console.log("Something went wrong");
        }
        return response;
      },
      err => {
        throw err;
      }
    );
  }
}
