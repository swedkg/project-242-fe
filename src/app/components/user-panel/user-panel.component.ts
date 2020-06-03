import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ActionCableService } from "angular2-actioncable";
import { Subscription } from "rxjs";
import * as fromStore from "../../store";
import { User } from "../../_models/user";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { SubmitRequestContentComponent } from "../submit-request-content/submit-request-content.component";

@Component({
  selector: "app-user-panel",
  templateUrl: "./user-panel.component.html",
  styleUrls: ["./user-panel.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements OnInit {
  current_user: User;
  subscription: Subscription;
  showNotifications: boolean = false;

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService,
    public MatDialog: MatDialog,
    private cableService: ActionCableService,
    private store: Store<fromStore.PlatformState>
  ) {}

  logout() {
    this.store.dispatch(new fromStore.RemoveAllMessages());
    // this.store.dispatch(new fromStore.RemoveAllRequests());
    this.UserService.logout();
    this.SidenavService.setSidenavOpen(false);
    // // console.log("action cable disconnect??");

    this.cableService.disconnect("ws://127.0.0.1:3000/cable");
  }

  get isLoggedIn() {
    return this.UserService.isLoggedIn;
  }

  addNewRequest(): void {
    const dialogRef = this.MatDialog.open(SubmitRequestContentComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      // console.log("The dialog was closed");
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

      this.store
        .select(fromStore.getAllNotifications, this.current_user.id)
        .subscribe((data) => {
          this.showNotifications = data.length == 0 ? false : true;
          // console.log(data, this.showNotifications);
        });

      // console.log("UserPanelComponent", this.current_user);
    });
  }

  ngOnDestroy() {
    // console.log("UserPanelComponent", this.current_user);
  }
}
