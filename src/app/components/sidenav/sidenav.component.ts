import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

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

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService
  ) {}

  isSidenavOpen: boolean = false;

  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }

  indexChanged(event) {
    this.SidenavService.setOpenChat(false);
    this.activeTab = event;
    // console.log("indexChanged to ->", event);

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
    });
  }
}
