import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../../_services/notifications.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  matBadgeHiddenAllNots: boolean = true;
  notificationsAllBadge: string;

  constructor(private NotificationsService: NotificationsService) {}

  ngOnInit() {
    this.NotificationsService.getNotitifications().subscribe((data) => {
      this.notificationsAllBadge = String(data.length);
      this.matBadgeHiddenAllNots = data.length == 0 ? true : false;
      console.log(data, this.notificationsAllBadge); //, this.matBadgeHiddenAllNots);
    });
  }
}
