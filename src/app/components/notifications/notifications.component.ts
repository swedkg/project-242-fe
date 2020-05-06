import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../../_models/message.model";
import { NotificationsService } from "../../_services/notifications.service";
import { UserService } from "../../_services/user.service";
import { User } from "../../_models/user";
import { SidenavService } from "../../_services/sidenav.service";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

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
    private NotificationsService: NotificationsService,
    private UserService: UserService,
    private SidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>
  ) {}

  ngOnInit() {
    this.UserService.currentUserSubject.subscribe((data) => {
      if (this.UserService.isLoggedIn) {
        this.current_user = this.UserService.currentUserDetails;
      }
    });

    this.notifications$ = this.NotificationsService.getNotitifications();

    this.notifications$.subscribe((data) => {
      this.notificationsAllBadge = String(data.length);
      data.forEach((d) => {
        console.log(d);
      });
      console.log(data, this.notificationsAllBadge);
    });
  }
}
