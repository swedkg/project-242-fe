import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromServices from '../../_services';

import * as messagesActions from '../actions/my-requests.actions';

@Injectable()
export class MyRequestsEffects {
  constructor(
    private actions$: Actions,
    private messagesService: fromServices.MessageFlowService
  ) {}
  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType<messagesActions.LoadMyRequests>(messagesActions.LOAD_MY_REQUESTS),
    switchMap(action => {
      return this.messagesService.getUserRequests(action.payload).pipe(
        map(messages => new messagesActions.LoadMyRequestsSuccess(messages)),
        catchError(error => of(new messagesActions.LoadMyRequestsFail(error)))
      );
    })
  );
}
