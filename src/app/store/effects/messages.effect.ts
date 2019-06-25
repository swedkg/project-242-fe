import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromServices from '../../_services';

import * as messagesActions from '../actions/messages.actions';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: fromServices.MessageFlowService
  ) {}
  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType(messagesActions.LOAD_MESSAGES),
    switchMap(action => {
      return this.messagesService.getUserResponses(action.payload).pipe(
        map(messages => new messagesActions.LoadMessagesSuccess(messages)),
        catchError(error => of(new messagesActions.LoadMessagesFail(error)))
      );
    })
  );
}
