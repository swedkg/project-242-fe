import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription, Subject, Observable, ReplaySubject } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import * as fromStore from "../store";
import * as messagesActions from "../store/actions/messages.actions";
import { User } from "../_models/user";
import { UserService } from "./user.service";
import { WebsocketsService } from "./websockets.service";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private current_user: User;
  private notifications = new ReplaySubject<any>();
  allNotification$;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private actions$: Actions,
    private ActionsSubject: ActionsSubject,
    private UserService: UserService,
    private WebsocketsService: WebsocketsService
  ) {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;

      this.allNotification$ = this.store
        .select(fromStore.getAllNotifications, this.current_user.id)
        .subscribe((data) => {
          console.log(data);
          this.setNotifications(data);
        });
    });
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

  // private init$ = this.actions$
  //   .pipe(
  //     ofType<messagesActions.LoadMessagesSuccess>(
  //       messagesActions.LOAD_MESSAGES_SUCCESS
  //     ),
  //     map((action) => {
  //       // action.payload.forEach((el) => {
  //       //   console.log(el);
  //       // });

  //       let messages = action.payload.filter(
  //         (message) =>
  //           message.receiver_id == this.current_user.id &&
  //           (message.status === 0 || message.status === 1)
  //       );
  //       // we need to notify that the messages were delivered
  //       // .forEach((message) =>
  //       //   this.WebsocketsService.messagingChannelMessageDelivered(message.id)
  //       // );

  //       console.log("LoadMessagesSuccess", action.payload, messages);

  //       this.setNotifications(messages);

  //       // messages.forEach(message => this.messagingChannelMessageDelivered(message.id))

  //       // this.messagingChannel.send({
  //       //   action: "message_displayed",
  //       //   message: action.payload,
  //       // });
  //       // localStorage.setItem("notifications", JSON.stringify(action.payload));
  //     })
  //   )
  //   .subscribe();

  private setNotifications(messages) {
    this.notifications.next(messages);
  }

  getNotitifications(): Observable<any> {
    return this.notifications;
  }

  // .pipe(
  //   ofType(
  //     messagesActions.LOAD_MESSAGES_SUCCESS,
  //     messagesActions.CREATE_WB_MESSAGE_SUCCESS
  //   ),
  //   withLatestFrom(this.store),
  //   map(([action]) => {
  //     // action.payload.forEach((el) => {
  //     //   console.log(el);
  //     // });
  //     // let messages = state[1][1].messages.entities;
  //     // let aidPlatform = Object.assign({}, state[1]);
  //     // aidPlatform.messages.entities
  //     // let messages = storeState.messages.entities;
  //     console.log(action);
  //     // localStorage.setItem("messages", JSON.stringify(messages));
  //   })
  // )
  // .subscribe();
}
