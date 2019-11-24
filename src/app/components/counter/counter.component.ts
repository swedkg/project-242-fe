import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { timer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { concatMap, map, tap, withLatestFrom } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";
// import { Observable } from 'rxjs';
import * as fromStore from "../../store";
import { log } from "util";

import { WebSocketSubject } from "rxjs/websocket";
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<fromStore.PlatformState>
  ) {}
  stats$: Observable<any>;
  stats = {};

  // subject = webSocket("ws://localhost:3000/cable/");

  ngOnInit() {
    // this.subject.subscribe(
    //   msg => console.log("message received: ", msg), // Called whenever there is a message from the server.
    //   err => console.log("error", err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log("complete") // Called when connection is closed (for whatever reason).
    // );

    // this.subject.next({ message: "some message" });

    // Observable.create(observer => {
    //   const socket = new WebSocket("ws://localhost:3000/cable/");
    //   socket.addEventListener("WebNotificationsChannel", data =>
    //     console.log(data)
    //   );
    //   socket.addEventListener("data", data => observer.next(data));
    //   return () => socket.close(); // is invoked on unsubscribe()
    // });
    const stat$ = this.http.get("http://localhost:3000/platform/status/");
    timer(0, 15000)
      .pipe(
        concatMap(_ => stat$),
        map((response: { requests: { requests: any } }) => response.requests)
      )
      .subscribe(stats => {
        // this.store.dispatch(new fromStore.LoadRequests());
        this.stats = stats;
      });
  }
}
