import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import * as fromStore from "../store";
import * as messagesActions from "../store/actions/messages.actions";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  userSubcr: Subscription;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private actions$: Actions,
    private ActionsSubject: ActionsSubject
  ) {
    // subscribe((data) => {
    //   console.log(data);
    //   localStorage.setItem("notifications", JSON.stringify(data.payload));
    //   // if (localStorage.getItem("notifications") == null) {
    //   //   console.log("No notification key in local storage");
    //   //   let arr = [];
    //   // }
    // });
    // we load messages only once. So this only works when we first load the app
    // after that, we need to rely on the websockets
  }

  // @Effect({ dispatch: false })
  // this.userSubcr =
  loadMessagesSuccess$ = this.actions$
    .pipe(
      ofType<messagesActions.CreateMessage>(messagesActions.CREATE_MESSAGE),
      withLatestFrom(this.store),
      map(([action, storeState]) => {
        // action.payload.forEach((el) => {
        //   console.log(el);
        // });
        // let messages = state[1][1].messages.entities;
        // let aidPlatform = Object.assign({}, state[1]);
        // aidPlatform.messages.entities
        // let messages = storeState.messages.entities;
        console.log(action, storeState);
        // localStorage.setItem("messages", JSON.stringify(messages));
      })
    )
    .subscribe();
}
