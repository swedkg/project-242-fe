import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as fromStore from "../../store";
import { AidRequest } from "../../_models/aidRequest.model";
import { User } from "../../_models/user";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { MessageFlowService } from "../../_services/message-flow.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

import { WebsocketsService } from "../../_services/websockets.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-my-requests",
  templateUrl: "./my-requests.component.html",
  styleUrls: ["./my-requests.component.scss"],
})
export class MyRequestsComponent implements OnInit {
  // @Input()
  activeTab: number;

  myRequests: any[] = [];
  myRequestsLength: number;
  subscription: Subscription;
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];
  activeThread: Number;
  activeMessagingTab: number;
  showMessages: boolean;
  chat$: object;
  responder_id: number;
  expandedPanel: number;
  expandedPanelOpen: number;
  openPanel: number;

  current_user: User;

  now;

  @ViewChild("showMessagesButton") showMessagesButton: ElementRef<HTMLElement>;

  constructor(
    private cdr: ChangeDetectorRef,
    private WebsocketsService: WebsocketsService,
    private store: Store<fromStore.PlatformState>,
    private SidenavService: SidenavService,
    private HelpRequestsService: HelpRequestsService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService
  ) {}

  handleShowMessages(fullfilmentId) {
    // this.activeThread = request_id;
    // this.responder_id = responder_id;
    // // this.SidenavService.setActiveSidenavTab(this.SidenavService.tabs.myRequests);
    // this.SidenavService.setCurrentTab(this.activeTab);
    this.SidenavService.setActiveThread(fullfilmentId);
    this.SidenavService.setOpenChat(true);
    // console.log(fullfilmentId);
  }

  handleRemoveResponder(fullfilment) {
    this.MessageFlowService.removeResponder(fullfilment);
  }

  handleMarkFulfilled(request_id) {
    event.stopPropagation();
    this.WebsocketsService.publicAnnouncement(request_id, "request_fulfilled");
  }

  handleRepublishRequest(request_id) {
    event.stopPropagation();
    this.WebsocketsService.publicAnnouncement(
      request_id,
      "request_republished"
    );
  }

  setStep(id) {
    this.openPanel = id;
  }

  ngOnInit() {
    let _getChatForResponder;

    setInterval(() => {
      this.now = formatDate(new Date(), "dd-MM-yyyy hh:mm:ss a", "en-US");
    }, 5000);

    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
      if (this.UserService.isLoggedIn) {
        // this.store.dispatch(new fromStore.LoadRequests());

        this.requests$ = this.store.select(
          fromStore.getUserRequests,
          this.current_user.id
        );

        this.requests$.subscribe((data) => {
          this.myRequestsLength = data.length;
        });
      }
    });

    this.SidenavService.getExpandedAccordionPanel().subscribe((data) => {
      this.expandedPanel = data;
    });

    this.SidenavService.getActiveThread().subscribe((data) => {
      this.activeThread = data;
    });

    this.SidenavService.getActiveSidenavTab().subscribe((data) => {
      this.activeTab = data;
    });
  }

  // auto-click button when we get into the component
  // ngAfterViewInit() {
  //   this.SidenavService.getExpandedAccordionPanel().subscribe((data) => {
  //     this.expandedPanel = data;
  //     setTimeout(
  //       function () {
  //         if (this.activeTab == this.SidenavService.tabs.myRequests) {
  //           let el: HTMLElement = this.showMessagesButton._elementRef
  //             .nativeElement;
  //           el.click();
  //         }
  //       }.bind(this),
  //       0
  //     );
  //   });
  // }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // console.log("we are out");
  }
}
