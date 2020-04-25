import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { User } from "../../_models/user";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { SubmitRequestContentComponent } from "../submit-request-content/submit-request-content.component";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { MessageFlowService } from "../../_services/message-flow.service";

import { ActionCableService, Channel } from "angular2-actioncable";

import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

@Component({
  selector: "app-user-panel",
  templateUrl: "./user-panel.component.html",
  styleUrls: ["./user-panel.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements OnInit {
  current_user: User;
  subscription: Subscription;

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService,
    public MatDialog: MatDialog,
    private cableService: ActionCableService,
    private MessageFlowService: MessageFlowService,
    private store: Store<fromStore.PlatformState>
  ) {}

  logout() {
    this.store.dispatch(new fromStore.RemoveAllMessages());
    // this.store.dispatch(new fromStore.RemoveAllRequests());
    this.UserService.logout();
    this.SidenavService.setSidenavOpen(false);
    console.log("action cable disconnect??");

    this.cableService.disconnect("ws://127.0.0.1:3000/cable");
  }

  get isLoggedIn() {
    return this.UserService.isLoggedIn;
  }

  addNewRequest(): void {
    const dialogRef = this.MatDialog.open(SubmitRequestContentComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;

      if (data == null) return;

      this.store.dispatch(new fromStore.RemoveAllMessages());
      this.store.dispatch(new fromStore.RemoveAllRequests());

      this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
      this.store.dispatch(new fromStore.LoadRequests());

      const platformStatusChannel: Channel = this.cableService
        .cable("ws://127.0.0.1:3000/cable", {
          room: this.current_user.authentication_token,
        })
        .channel("PlatformStatusChannel");

      // Subscribe to incoming platform messages
      this.subscription = platformStatusChannel
        .received()
        .subscribe((status) => {
          // console.log("PlatformStatusChannel", status);
          this.MessageFlowService.setPlatformStatusChannelMessage(status);
        });

      const messagingChannel: Channel = this.cableService
        .cable("ws://127.0.0.1:3000/cable", {
          room: this.current_user.authentication_token,
        })
        .channel("MessagingChannel");

      // Subscribe to incoming platform messages
      this.subscription = messagingChannel.received().subscribe((received) => {
        console.log("MessagingChannel", received);
        if (received.type == "message") {
          let message = Object.assign({}, received.body);
          message.status = 1;

          this.store.dispatch(new fromStore.CreateWebSocketMessage(message));

          // notify the original sender
          // that the message was received
          console.log(message);
          messagingChannel.send({ action: "received", message: message });
        }

        if (received.type == "request")
          this.store.dispatch(
            new fromStore.CreateWebSocketRequest(received.body)
          );

        if (received.type == "remove_orphan_messages") {
          let body = Object.assign({}, received.body);
          console.log(body);

          this.store.dispatch(
            new fromStore.RemoveRespodersMessages(body.fullfilment_id)
          );
        }
      });
      console.log("UserPanelComponent", this.current_user);
    });
  }

  ngOnDestroy() {
    console.log("UserPanelComponent", this.current_user);
  }
}
