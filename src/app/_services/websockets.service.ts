import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";
import * as fromStore from "../store";
import { User } from "../_models/user";
import { MessageFlowService } from "./message-flow.service";
import { UserService } from "./user.service";

import * as messagesActions from "../store/actions/messages.actions";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebsocketsService {
  private current_user: User;

  private platformStatusSubscription: Subscription;
  private messagingChannelSubscription: Subscription;

  private platformStatusChannel: Channel;
  private messagingChannel: Channel;

  private subsc: Subscription;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private cableService: ActionCableService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService,
    private ActionsSubject: ActionsSubject,
    private actions$: Actions
  ) {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
      // console.log("WebsocketsService", data);
      if (this.current_user != null) {
        this.platformStatusChannelConnect();
        this.platformStatusChannelSubscribe();
        this.messagingChannelConnect();
        this.messagingChannelSubscribe();
      } else this.disconnect();
    });

    // TODO: decide when to load the messages. Look for fromStore.LoadMessages

    // TODO: the "message_delivered" case from the webSocket service
    // in only active when the chat is open
    // we shoud get the status on incoming messages the moment that we
    // init the panel

    // TODO: notifications service ????
    // write a list of message id and status in the local storage
    // and compare it with the store
    // depending on the result, we will notify of delivery of message
  }

  /**
   * messagingChannelMessageDisplayed
  id:number   */
  public messagingChannelMessageDisplayed(id: number) {
    this.messagingChannel.send({
      action: "message_displayed",
      message: id,
    });
  }
  /**
   * messagingChannelMessageDelivered
  id:number   */
  public messagingChannelMessageDelivered(id: number) {
    this.messagingChannel.send({
      action: "message_delivered",
      message: id,
    });
  }

  /**
   * notifyPublic
  data: any
  */
  public publicAnnouncement(id: number, _type: string) {
    this.platformStatusChannel.send({
      action: "public_announcement",
      message: { id: id, type: _type },
    });
  }

  /**
   * disconnect
   */
  private disconnect() {
    this.cableService.disconnect("ws://127.0.0.1:3000/cable");
  }

  private platformStatusChannelConnect() {
    this.platformStatusChannel = this.cableService
      .cable("ws://127.0.0.1:3000/cable", {
        room: this.current_user.authentication_token,
      })
      .channel("PlatformStatusChannel");
  }

  private platformStatusChannelSubscribe() {
    this.platformStatusChannel.received().subscribe((data) => {
      switch (data.type) {
        case "status": {
          this.MessageFlowService.setPlatformStatusChannelMessage(data);
          break;
        }
        case "request_fulfilled": {
          let request = Object.assign({}, data.request);
          console.log("PlatformStatusChannel", data, request);
          this.store.dispatch(new fromStore.RequestFulfilled(request.id));
        }
      }

      // if (data.type == "status")
    });
  }

  private messagingChannelConnect() {
    this.messagingChannel = this.cableService
      .cable("ws://127.0.0.1:3000/cable", {
        room: this.current_user.authentication_token,
      })
      .channel("MessagingChannel");
  }

  private messagingChannelSubscribe() {
    this.messagingChannel.received().subscribe((received) => {
      console.log("MessagingChannel", received);

      switch (received.type) {
        case "message": {
          // on the receiver side, when we receive a message, set the status as delivered (=1)
          let message = Object.assign({}, received.body);
          // message.status = 1;

          // and save it to the store
          this.store.dispatch(new fromStore.CreateWebSocketMessage(message));

          // notify the original sender
          // that the message was received
          if (
            message.receiver_id == this.current_user.id &&
            message.status == 0
          ) {
            this.messagingChannel.send({
              action: "message_delivered",
              message: message.id,
            });
          }
          break;
        }

        case "request": {
          this.store.dispatch(
            new fromStore.CreateWebSocketRequest(received.body)
          );
          break;
        }

        case "remove_orphan_messages": {
          let body = Object.assign({}, received.body);
          this.store.dispatch(
            new fromStore.RemoveRespodersMessages(body.fullfilment_id)
          );
          break;
        }

        case "message_delivered": {
          let body = Object.assign({}, received.body);
          this.store.dispatch(new fromStore.MessageDelivered(body.message_id));
          break;
        }

        case "message_displayed": {
          let body = Object.assign({}, received.body);
          this.store.dispatch(new fromStore.MessageDisplayed(body.message_id));
          break;
        }
      }
    });
  }
}
