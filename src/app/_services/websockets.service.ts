import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActionCableService, Channel } from "angular2-actioncable";
import * as fromStore from "../store";
import { User } from "../_models/user";
import { webSocket } from "./host";
import { MessageFlowService } from "./message-flow.service";
import { UserService } from "./user.service";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketsService {
  private current_user: User;

  private platformStatusChannel: Channel;
  private messagingChannel: Channel;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private cableService: ActionCableService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService,
    private SnackbarService: SnackbarService
  ) {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
      // // console.log("WebsocketsService", data);
      if (this.current_user != null) {
        this.platformStatusChannelConnect();
        this.platformStatusChannelSubscribe();
        this.messagingChannelConnect();
        this.messagingChannelSubscribe();
      } else this.disconnect();
    });
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
    this.cableService.disconnect("wss://" + webSocket + "/cable");
  }

  private platformStatusChannelConnect() {
    this.platformStatusChannel = this.cableService
      .cable("wss://" + webSocket + "/cable", {
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
          // console.log("PlatformStatusChannel", data, request);
          this.store.dispatch(new fromStore.RequestFulfilled(request.id));
          break;
        }

        case "request_republished": {
          let request = Object.assign({}, data.request);
          // console.log("PlatformStatusChannel", data, request);
          this.store.dispatch(new fromStore.RequestRepublished(request.id));

          this.store
            .select(fromStore.getSingleRequest, request.id)
            .subscribe((data) => {
              let request = data[0];
              let user = this.UserService.currentUserDetails;
              if (request.owner_id == user.id)
                this.SnackbarService.show("Your request was republished");
            });
          break;
        }

        case "request": {
          // console.log("PlatformStatusChannel", data);
          this.store.dispatch(new fromStore.CreateWebSocketRequest(data.body));
          break;
        }
      }

      // if (data.type == "status")
    });
  }

  private messagingChannelConnect() {
    this.messagingChannel = this.cableService
      .cable("wss://" + webSocket + "/cable", {
        room: this.current_user.authentication_token,
      })
      .channel("MessagingChannel");
  }

  private messagingChannelSubscribe() {
    this.messagingChannel.received().subscribe((received) => {
      // console.log("MessagingChannel", received);

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
