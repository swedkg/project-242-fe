import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../app/_services/sidenav.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private SidenavService: SidenavService) {}
  events: string[] = [];
  isSidenavOpen: boolean = false;
  messagingSidenavOpened: boolean = false;

  openMessagingSidepanel() {
    console.log("this should open the Messaging Sidepanel ");
  }
  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }
  toggleMessagingSidenav() {
    this.messagingSidenavOpened = !this.messagingSidenavOpened;
    this.SidenavService.setMessagingSidenavOpened(this.messagingSidenavOpened);
  }
  ngOnInit(): void {
    this.SidenavService.isRequestSidenavOpened().subscribe(data => {
      this.isSidenavOpen = data;
    });
    this.SidenavService.isMessagingSidenavOpened().subscribe(data => {
      this.messagingSidenavOpened = data;
    });
  }
}
