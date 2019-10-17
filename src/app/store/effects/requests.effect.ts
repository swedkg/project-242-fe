import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromServices from '../../_services';

import * as requestsActions from '../actions/requests.action';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: fromServices.HelpRequestsService
  ) {}
  @Effect()
  loadRequests$ = this.actions$.pipe(
    ofType(requestsActions.LOAD_REQUESTS),
    switchMap(() => {
      return this.requestsService.getAllRequests().pipe(
        map(requests => new requestsActions.LoadRequestsSuccess(requests)),
        catchError(error => of(new requestsActions.LoadRequestsFail(error)))
      );
    })
  );

  @Effect()
  createRequest$ = this.actions$.pipe(
    ofType<requestsActions.CreateRequest>(requestsActions.CREATE_REQUEST),
    // map((action: requestsActions.CreateRequest)=> action.payload),
    switchMap(action => {
      let request = action.payload;
      return this.requestsService.createRequest(request).pipe(
        map(request => new requestsActions.CreateRequestSuccess(request)),
        catchError(error => of(new requestsActions.CreateRequestFail(error)))
      );
    })
  );
}
