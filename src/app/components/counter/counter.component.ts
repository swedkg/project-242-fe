import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActionCableService, Channel } from "angular2-actioncable";
import { Subscription } from "rxjs";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  providers: [ActionCableService],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {
  platformStatus = {
    requests: { total: 0, unfulfilled: 0, time: "" }
  };
  // platformStatus.
  constructor(private cableService: ActionCableService) {}
  subscription: Subscription;

  ngOnInit() {
    // Open a connection and obtain a reference to the channel
    const channel: Channel = this.cableService
      .cable("ws://127.0.0.1:3000/cable")
      .channel("WebNotificationsChannel");
    // Subscribe to incoming messages
    this.subscription = channel.received().subscribe(status => {
      this.platformStatus = status;
      console.log(status, this.platformStatus);
    });
  }
}
