import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // private SnackbarService: SnackbarService;

  constructor(
    private http: HttpClient,
    private SnackbarService: SnackbarService
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
    let url: string = "http://localhost:3000/users/";

    return this.http.post<any>(url, payload).pipe(
      map(user => {
        this.saveUserToLocalStorage(user);
        return user;
      })
    );
  }

  login(payload) {
    let url: string = "http://localhost:3000/sessions/";

    return this.http.post<any>(url, payload).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        this.saveUserToLocalStorage(user);
        this.SnackbarService.show("Login");
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    let url: string = "http://localhost:3000/user/logout";

    return this.http.delete(url, { observe: "response" }).subscribe(
      response => {
        console.log(response, response.status);
        if (response.status === 200) {
          localStorage.removeItem("currentUser");
          this.currentUserSubject.next(null);
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
