import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap } from "rxjs/operators";

import { MessageFlowService } from "../../_services/message-flow.service";

import * as messagesActions from "../actions/messages.actions";

@Injectable()
export class MyMessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessageFlowService
  ) {}

  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType<messagesActions.LoadMessages>(messagesActions.LOAD_MESSAGES),
    switchMap(action => {
      return this.messagesService.getUserMessages(action.payload).pipe(
        map(messages => new messagesActions.LoadMessagesSuccess(messages)),
        catchError(error => of(new messagesActions.LoadMessagesFail(error)))
      );
    })
  );

  @Effect()
  createMessage$ = this.actions$.pipe(
    ofType<messagesActions.CreateMessage>(messagesActions.CREATE_MESSAGE),
    switchMap(action => {
      let message = action.payload;
      return this.messagesService.createMessage(message).pipe(
        map(message => new messagesActions.CreateMessageSuccess(message)),
        catchError(error => of(new messagesActions.CreateMessageFail(error)))
      );
    })
  );

  @Effect()
  createWebSocketMessage$ = this.actions$.pipe(
    ofType<messagesActions.CreateWebSocketMessage>(
      messagesActions.CREATE_WB_MESSAGE
    ),
    map(action => {
      let message = action.payload;
      return new messagesActions.CreateWebSocketMessageSuccess(message);
    })
  );
}
