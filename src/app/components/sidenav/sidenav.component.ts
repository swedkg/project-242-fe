import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

import { NotificationsService } from "../../_services/notifications.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  activeTab: number = 0;
  showMessages: boolean;
  isLoggedIn: boolean;

  matBadgeHiddenAllNots: boolean = true;
  notificationsAllBadge: string = "10";

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService,
    private NotificationsService: NotificationsService
  ) {}

  isSidenavOpen: boolean = false;

  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }

  indexChanged(event) {
    this.SidenavService.setOpenChat(false);
    this.activeTab = event;
    console.log("indexChanged to ->", event);

    this.SidenavService.setActiveSidenavTab(event);
  }

  ngOnInit() {
    this.SidenavService.getActiveSidenavTab().subscribe(
      (data) => (this.activeTab = data)
    );

    this.SidenavService.getOpenChat().subscribe(
      (data) => (this.showMessages = data)
    );

    this.SidenavService.getSidenavOpen().subscribe(
      (data) => (this.isSidenavOpen = data)
    );

    this.UserService.currentUserSubject.subscribe((data) => {
      this.isLoggedIn = this.UserService.isLoggedIn;
      // console.log(this.isLoggedIn);
    });

    this.NotificationsService.getNotitifications().subscribe((data) => {
      this.notificationsAllBadge = String(data.length);
      this.matBadgeHiddenAllNots = data.length == 0 ? true : false;
      console.log(data, this.notificationsAllBadge); //, this.matBadgeHiddenAllNots);
    });
  }
}
