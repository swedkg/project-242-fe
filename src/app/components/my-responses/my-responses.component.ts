import {
  ChangeDetectorRef,
  AfterContentChecked,
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as fromStore from "../../store";
import { AidRequest } from "../../_models/aidRequest.model";
import { Message } from "../../_models/message.model";
import { User } from "../../_models/user";
import { MessageFlowService } from "../../_services/message-flow.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { timeout } from "rxjs/operators";

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-my-responses",
  templateUrl: "./my-responses.component.html",
  styleUrls: ["./my-responses.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MyResponsesComponent implements OnInit, AfterContentChecked {
  // @Input()
  activeTab: number;

  // myResponses$: Observable<Message>;
  allResponses: any[] = [];
  myResponses$: Observable<AidRequest[]>;
  myResponses: any[] = [];
  myResponsesIDs: any[] = [];
  myResponsesList: any[] = [];
  myResponsesLength: number;
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  showMessages: boolean = false;
  expandedPanel: number;
  expandedPanelOpen: number;
  messageMaxLength = 150;
  newMessage: any = {};
  activeThread: Number;
  chat$: Observable<Message>[];
  public newMessageForm: FormGroup;

  current_user: User;

  @ViewChild("showMessagesButton") showMessagesButton: ElementRef<HTMLElement>;

  // TODO: handle republish/markfulliled with websockets

  constructor(
    private cdr: ChangeDetectorRef,
    private SidenavService: SidenavService,
    private messageFlowService: MessageFlowService,
    private UserService: UserService,
    private HelpRequestsService: HelpRequestsService,

    private store: Store<fromStore.PlatformState>
  ) {}

  handleShowMessages(id) {
    // this.activeThread = id;
    this.SidenavService.setActiveThread(id);
    this.SidenavService.setOpenChat(true);
    // this.SidenavService.setCurrentTab(this.activeTab);
    console.log(this);
  }

  handleMarkFulfilled(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.markFulfilled(request_id);
  }

  handleRepublishRequest(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.republishRequest(request_id);
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    console.log("open my responses");

    this.newMessageForm = new FormGroup({
      messageText: new FormControl("", [
        Validators.required,
        Validators.maxLength(this.messageMaxLength),
      ]),
    });

    let _getChatMessages;

    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
      if (this.UserService.isLoggedIn) {
        this.myResponses$ = this.store.select(
          fromStore.getUserResponses,
          this.current_user.id
        );

        this.myResponses$.subscribe((data) => {
          this.myResponsesLength = data.length;
          console.log(data, data.length, this.myResponsesLength);
        });
      }
    });

    this.SidenavService.getActiveThread().subscribe((data) => {
      this.activeThread = data;
    });

    this.SidenavService.getActiveSidenavTab().subscribe((data) => {
      this.activeTab = data;
    });
  }

  ngAfterViewInit() {
    this.SidenavService.getExpandedAccordionPanel().subscribe((data) => {
      this.expandedPanel = data;
      setTimeout(
        function () {
          if (this.activeTab == this.SidenavService.tabs.myResponses) {
            let el: HTMLElement = this.showMessagesButton._elementRef
              .nativeElement;
            el.click();
          }
        }.bind(this),
        100
      );
    });
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    console.log("closing my responses");
  }
}
