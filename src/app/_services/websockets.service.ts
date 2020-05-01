import { Injectable } from "@angular/core";
import { ActionsSubject, Store } from "@ngrx/store";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";
import * as fromStore from "../store";
import * as messagesActions from "../store/actions/messages.actions";
import { User } from "../_models/user";
import { MessageFlowService } from "./message-flow.service";
import { UserService } from "./user.service";
import { ofType } from "@ngrx/effects";

@Injectable({
  providedIn: "root",
})
export class WebsocketsService {
  current_user: User;

  platformStatusSubscription: Subscription;
  messagingChannelSubscription: Subscription;

  platformStatusChannel: Channel;
  messagingChannel: Channel;

  subsc: Subscription;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private cableService: ActionCableService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService,
    private ActionsSubject: ActionsSubject
  ) {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
      console.log("WebsocketsService", this);
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

    // TODO: localstorage service ????
    // write a list of message id and status in the local storage
    // and compare it with the store
    // depending on the result, we will notify of delivery of message

    this.subsc = this.ActionsSubject.pipe(
      ofType(messagesActions.LOAD_MESSAGES_SUCCESS)
    ).subscribe((data) => {
      console.log(data);
    });

    // we load messages only once. So this only works when we first load the app
    // after that, we need to rely on the websockets
  }

  /**
   * messagingChannelMessageRead
id:number   */
  public messagingChannelMessageRead(id: number) {}

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
    this.platformStatusChannel.received().subscribe((status) => {
      // console.log("PlatformStatusChannel", status);
      this.MessageFlowService.setPlatformStatusChannelMessage(status);
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
          message.status = 1;

          // and save it to the store
          this.store.dispatch(new fromStore.CreateWebSocketMessage(message));

          // notify the original sender
          // that the message was received
          this.messagingChannel.send({ action: "delivered", message: message });
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
        }

        case "message_read": {
          let body = Object.assign({}, received.body);
          this.store.dispatch(new fromStore.MessageRead(body.message_id));
        }
      }
    });
  }
}
