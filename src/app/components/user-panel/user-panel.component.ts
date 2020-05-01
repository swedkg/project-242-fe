import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";
import * as fromStore from "../../store";
import { User } from "../../_models/user";
import { MessageFlowService } from "../../_services/message-flow.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { SubmitRequestContentComponent } from "../submit-request-content/submit-request-content.component";

import { WebsocketsService } from "../../_services/websockets.service";

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
    private store: Store<fromStore.PlatformState>,
    private WebsocketsService: WebsocketsService
  ) {}

  logout() {
    this.store.dispatch(new fromStore.RemoveAllMessages());
    // this.store.dispatch(new fromStore.RemoveAllRequests());
    this.UserService.logout();
    this.SidenavService.setSidenavOpen(false);
    // console.log("action cable disconnect??");

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

      console.log("UserPanelComponent", this.current_user);
    });
  }

  ngOnDestroy() {
    console.log("UserPanelComponent", this.current_user);
  }
}
