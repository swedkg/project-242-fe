import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";
import * as fromStore from "../store";
import { User } from "../_models/user";
import { MessageFlowService } from "./message-flow.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketsService {
  current_user: User;

  platformStatusSubscription: Subscription;
  messagingChannelSubscription: Subscription;

  platformStatusChannel: Channel;
  messagingChannel: Channel;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private cableService: ActionCableService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService
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
      }
    });
  }
}
