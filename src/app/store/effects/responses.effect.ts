import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromServices from '../../_services';

import * as messagesActions from '../actions/responses.actions';

@Injectable()
export class MyResponsesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: fromServices.MessageFlowService
  ) {}
  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType<messagesActions.LoadResponses>(messagesActions.LOAD_RESPONSES),
    switchMap(action => {
      return this.messagesService.loadResponses(action.payload).pipe(
        map(messages => new messagesActions.LoadResponsesSuccess(messages)),
        catchError(error => of(new messagesActions.LoadResponsesFail(error)))
      );
    })
  );
}
