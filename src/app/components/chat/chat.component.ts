import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromStore from "../../store";
import { Message } from "../../_models/message.model";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  public newMessageForm: FormGroup;
  messageMaxLength = 150;
  newMessage: any = {};
  chatMessages$: Observable<Message[]>;
  chatMessages: {};
  chatRequest: any = {};
  current_user: any = {};

  constructor(
    private SidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>,
    private UserService: UserService
  ) {}

  // @Input() request_id: number;
  request_id: number;
  @Input() responder_id: number;
  @Input() showMessages: boolean;
  // @Input() chat$: any;
  chat$: any;
  activeTab;

  sendMessage() {
    let fullfilment_id = this.chat$[0].fullfilment_id;

    this.newMessage.message = this.newMessageForm.controls.messageText.value;
    this.newMessage.fullfilment_id = fullfilment_id;
    this.newMessage.sender_id = this.current_user.id;

    this.newMessage.users = {};
    let users = this.chat$[0].users;
    // this.activeTab = this.SidenavService.getCurrentSidenavTab();

    if (this.activeTab === 1) {
      this.newMessage.receiver_id = this.chatRequest.owner_id;
      this.newMessage.users.receiver = users.receiver;
      this.newMessage.users.sender = users.sender;
    } else {
      this.newMessage.receiver_id = users.sender.id;
      this.newMessage.users.receiver = users.sender;
      this.newMessage.users.sender = users.receiver;
    }

    // this.newMessage.receiver_id =
    // this.activeTab === 1
    // ? this.chatRequest.owner_id
    // : this.chat$[0].users.sender.id;

    console.log(this);

    // return null;

    this.store.dispatch(new fromStore.CreateMessage(this.newMessage));

    this.newMessage = {};
    this.newMessageForm.reset();

    setTimeout(() => {
      this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
    }, 100);

    this.scrollMessageFLowContainer();

    // http://localhost:3000/messages/?text=I want to help&fullfilment_id=1&sender_id=2&receiver_id=1
    // this.messageFlowService.sendMessage(this.newMessage);
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  // scroll element to bottom
  scrollMessageFLowContainer() {
    let el = document.querySelector(".message-flow-container");
    if (el === null) return false;
    el.scrollTo({
      left: 0,
      top: el.scrollHeight,
      behavior: "smooth"
    });
    // el.scrollTop = el.scrollHeight;
  }

  resetChat() {
    this.newMessageForm.reset();
  }

  closeChat() {
    this.SidenavService.setOpenChat(false);
    this.showMessages = false;
  }

  _getActiveChat;
  _getActiveThread;
  _chatRequest;

  ngOnInit() {
    console.log("chat init");

    this.current_user = this.UserService.currentUserDetails;

    // this.request_id = this.SidenavService.thread;

    // this.chatMessages$ = this.store.select(
    //   fromStore.getChatMessages,
    //   this.request_id
    // );

    // this.SidenavService.getOpenChat().subscribe(data => {
    //   this.showMessages = data;
    // });

    this._getActiveChat = this.SidenavService.getActiveChat().subscribe(
      data => {
        // this.chat$ = this.SidenavService.activeChat;
        this.chat$ = data;
        console.log("getActiveChat", data);
        setTimeout(this.scrollMessageFLowContainer, 100);
      }
    );

    // this.chatMessages$ = this.chat$;

    // this.chatMessages$.subscribe(data => {
    //   console.log('fromStore.getChatMessages', data);
    // });

    this._getActiveThread = this.SidenavService.getActiveThread().subscribe(
      request_id => {
        // this.activeThread = data;
        // this.SidenavService.setOpenChat(true);
        this.request_id = request_id;
        this._chatRequest = this.store
          .select(fromStore.getSingleRequest, this.request_id)
          .subscribe((chatRequest: any) => {
            this.chatRequest = chatRequest[0];
            console.log(
              "fromStore.getSingleRequest",
              this.request_id,
              this.chatRequest
            );
          });
        console.log("Chat chatRequest", request_id);
      }
    );

    this.activeTab = this.SidenavService.getCurrentTab();
    console.log(this);

    this.newMessageForm = new FormGroup({
      messageText: new FormControl("", [
        Validators.required,
        Validators.maxLength(this.messageMaxLength)
      ])
    });
  }

  ngOnDestroy() {
    if (this._getActiveChat) this._getActiveChat.unsubscribe();
    if (this._getActiveThread) this._getActiveThread.unsubscribe();
    if (this._chatRequest) this._chatRequest.unsubscribe();
    // if (this._getActiveSidenavTab) this._getActiveSidenavTab.unsubscribe();
    // console.clear();
    console.log("closing chat");
  }
}
