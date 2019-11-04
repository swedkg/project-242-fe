import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  constructor(private http: HttpClient) {}
  stats$: Observable<any>;

  stats = {};

  ngOnInit() {
    const stat$ = this.http.get('http://localhost:3000/platform/status/');

    timer(0, 15000)
      .pipe(
        concatMap(_ => stat$),
        map((response: { requests: { requests: any } }) => response.requests)
      )
      .subscribe(stats => {
        this.stats = stats;
      });
  }
}
