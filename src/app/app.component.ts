import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../app/_services/sidenav.service";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [ActionCableService]
})
export class AppComponent implements OnInit {
  constructor(
    private SidenavService: SidenavService,
    private cableService: ActionCableService
  ) {}
  events: string[] = [];
  isSidenavOpen: boolean = false;
  messagingSidenavOpened: boolean = false;
  subscription: Subscription;

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
    // (function() {
    //   // body of the function
    //   return new WebSocket("ws://127.0.0.1:3000/cable");
    // })();

    // Open a connection and obtain a reference to the channel
    const channel: Channel = this.cableService
      .cable("ws://127.0.0.1:3000/cable")
      .channel("WebNotificationsChannel");

    // Subscribe to incoming messages
    this.subscription = channel.received().subscribe(message => {
      console.log(message);

      // this.messageService.notify(message);
    });

    this.SidenavService.isRequestSidenavOpened().subscribe(data => {
      this.isSidenavOpen = data;
    });
    this.SidenavService.isMessagingSidenavOpened().subscribe(data => {
      this.messagingSidenavOpened = data;
    });
  }
}
