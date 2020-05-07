import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromStore from "../../store";
import { Message } from "../../_models/message.model";
import { User } from "../../_models/user";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  matBadgeHiddenAllNots: boolean = true;
  notificationsAllBadge: string;
  current_user: User;
  notifications$: Observable<Message[]>;

  goToMessages(id) {
    let req;
    this.store
      .select(fromStore.getSingleRequest, id)
      .subscribe((request: any) => {
        req = request[0];
      });
    let tab =
      req.owner_id === this.current_user.id
        ? this.SidenavService.tabs.myRequests
        : this.SidenavService.tabs.myResponses;
    this.SidenavService.setActiveSidenavTab(tab);
    this.SidenavService.setExpandedAccordionPanel(id);
    console.log(id, req, req.owner_id === this.current_user.id);
  }

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>
  ) {}

  ngOnInit() {
    this.UserService.currentUserSubject.subscribe(() => {
      if (this.UserService.isLoggedIn) {
        this.current_user = this.UserService.currentUserDetails;
      }
    });

    this.notifications$ = this.store.select(
      fromStore.getAllNotifications,
      this.current_user.id
    );

    this.notifications$.subscribe((data) => {
      this.notificationsAllBadge = String(data.length);
    });
  }
}
