import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../_models/user";
import { UserService } from "../../_services/user.service";
import { MessageFlowService } from "../../_services/message-flow.service";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CounterComponent implements OnInit, OnDestroy {
  platformStatus = {
    requests: { total: 0, unfulfilled: 0, time: "" },
    onlineUsers: 0,
  };

  constructor(
    private UserService: UserService,
    private MessageFlowService: MessageFlowService
  ) {}
  subscription: Subscription;
  current_user: User;
  isLoggedIn: boolean = false;

  ngOnInit() {
    console.log("The counter was created");

    this.UserService.currentUserSubject.subscribe((data) => {
      if (this.UserService.isLoggedIn) {
        this.isLoggedIn = this.UserService.isLoggedIn;
        this.current_user = this.UserService.currentUserDetails;
      }
    });

    this.MessageFlowService.getPlatformStatusChannelMessage().subscribe(
      (received) => {
        if (received.type == "status")
          this.platformStatus = received.body.platform_status;
        this.platformStatus.onlineUsers = received.online_users;
        console.log("PlatformStatusChannel", received, this.platformStatus);
      }
    );
  }

  ngOnDestroy() {
    console.log("The counter was destroyed");
  }
}
