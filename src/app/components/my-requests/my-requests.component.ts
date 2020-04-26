import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
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

  @ViewChild("showMessagesButton") showMessagesButton: ElementRef<HTMLElement>;

  constructor(
    private cdr: ChangeDetectorRef,

    private store: Store<fromStore.PlatformState>,
    private SidenavService: SidenavService,
    private HelpRequestsService: HelpRequestsService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService
  ) {}

  handleShowMessages(request_id, responder_id) {
    // this.activeThread = request_id;
    // this.responder_id = responder_id;
    // // this.SidenavService.setActiveSidenavTab(this.SidenavService.tabs.myRequests);
    // this.SidenavService.setCurrentTab(this.activeTab);
    this.SidenavService.setActiveThread(request_id);
    this.SidenavService.setOpenChat(true);
    console.log(request_id, responder_id);
  }

  handleRemoveResponder(fullfilment) {
    // we need the fullfilment id here
    // BUG: the responder is removed by we need to reload
    console.log(fullfilment);

    this.MessageFlowService.removeResponder(fullfilment);
  }

  handleMarkFulfilled(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.markFulfilled(request_id);
  }

  handleRepublishRequest(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.republishRequest(request_id);
  }

  setStep(id) {
    this.openPanel = id;
  }

  ngOnInit() {
    let _getChatForResponder;

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

    this.MessageFlowService.getRemovedResponder().subscribe((data) => {
      console.log(data, this);
      // BUG: Close chat on responder's site when they are removed
    });
  }

  ngAfterViewInit() {
    this.SidenavService.getExpandedAccordionPanel().subscribe((data) => {
      this.expandedPanel = data;
      setTimeout(
        function () {
          if (this.activeTab == this.SidenavService.tabs.myRequests) {
            let el: HTMLElement = this.showMessagesButton._elementRef
              .nativeElement;
            el.click();
          }
        }.bind(this),
        0
      );
    });
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    console.log("we are out");
  }
}
