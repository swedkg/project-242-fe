import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<fromStore.PlatformState>
  ) {}
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
        // this.store.dispatch(new fromStore.LoadRequests());
        this.stats = stats;
      });
  }
}
