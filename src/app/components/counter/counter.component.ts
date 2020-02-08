import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { timer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { concatMap, map, tap, withLatestFrom } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {
  stats= { total: 0, unfulfilled: 0, time: "" };
  constructor(private http: HttpClient) {}
  stats$: Observable<any>;
  // public stats;

  ngOnInit() {
    const stat$ = this.http.get("http://localhost:3000/platform/status/");
    console.log("stats$ ->", stat$);
    timer(0, 15000)
      .pipe(
        concatMap(_ => stat$),
        map(
          (response: {
            requests: { total: number; unfulfilled: number; time: string };
          }) => response.requests
        )
      )
      .subscribe(stats => {
        console.log("stats ->", stats);
        this.stats = stats;
      });
  }
}
