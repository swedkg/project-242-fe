import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../app/_services/sidenav.service";
import { WebsocketsService } from "./_services/websockets.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private SidenavService: SidenavService) {}
  events: string[] = [];
  isSidenavOpen: boolean = false;
  messagingSidenavOpened: boolean = false;

  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }

  ngOnInit(): void {
    this.SidenavService.isRequestSidenavOpened().subscribe((data) => {
      this.isSidenavOpen = data;
    });
  }
}
