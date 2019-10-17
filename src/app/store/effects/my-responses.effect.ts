import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromServices from '../../_services';

import * as messagesActions from '../actions/my-responses.actions';

@Injectable()
export class MyResponsesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: fromServices.MessageFlowService
  ) {}
  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType<messagesActions.LoadMyResponses>(messagesActions.LOAD_MY_RESPONSES),
    switchMap(action => {
      return this.messagesService.loadMyResponses(action.payload).pipe(
        map(messages => new messagesActions.LoadMyResponsesSuccess(messages)),
        catchError(error => of(new messagesActions.LoadMyResponsesFail(error)))
      );
    })
  );
}
