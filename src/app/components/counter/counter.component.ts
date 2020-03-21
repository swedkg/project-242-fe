import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";
import { UserService } from "../../_services/user.service";
import { User } from "../../_models/user";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  providers: [ActionCableService, UserService],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit, OnDestroy {
  platformStatus = {
    requests: { total: 0, unfulfilled: 0, time: "" }
  };
  // platformStatus.
  constructor(
    private cableService: ActionCableService,
    private UserService: UserService
  ) {}
  subscription: Subscription;
  current_user: User;

  ngOnInit() {
    console.log("The counter was created");

    this.current_user = this.UserService.currentUserDetails;

    // // Open a connection and obtain a reference to the channel
    // const channel: Channel = this.cableService
    //   .cable("ws://127.0.0.1:3000/cable")
    //   .channel("WebNotificationsChannel");
    // // Subscribe to incoming messages
    // this.subscription = channel.received().subscribe(status => {
    //   this.platformStatus = status;
    //   console.log(status, this.platformStatus);
    // });
  }

  ngOnDestroy() {
    console.log("The counter was destroyed");
    // this.cableService.disconnect("ws://127.0.0.1:3000/cable");
  }
}
