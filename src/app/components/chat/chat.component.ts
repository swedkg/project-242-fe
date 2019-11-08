import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../store';

import { Message } from '../../models/message.model';

import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { SidenavService } from '../../_services/sidenav.service';
import { MessageFlowService } from '../../_services/message-flow.service';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  public newMessageForm: FormGroup;
  messageMaxLength = 150;
  newMessage: any = {};
  chatMessages$: Observable<Message[]>;
  chatMessages: {};
  chatRequest: object = {};

  constructor(
    private SidenavService: SidenavService,
    private messageFlowService: MessageFlowService,
    private store: Store<fromStore.PlatformState> // public globals: Globals
  ) {}

  // @Input() request_id: number;
  request_id: number;
  @Input() responder_id: number;
  @Input() showMessages: boolean;
  // @Input() chat$: any;
  chat$: any;

  sendMessage() {
    let fullfilment_id = this.chat$[0].fullfilment_id;
    this.newMessage.message = this.newMessageForm.controls.messageText.value;
    this.newMessage.fullfilment_id = fullfilment_id;
    this.newMessage.sender_id = Globals.id;
    this.newMessage.receiver_id = this.responder_id;
    console.log(this.newMessage);

    // http://localhost:3000/messages/?text=I want to help&fullfilment_id=1&sender_id=2&receiver_id=1
    // this.messageFlowService.sendMessage(this.newMessage);
    this.newMessageForm.reset();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  closeChat() {
    this.SidenavService.setOpenChat(false);
    this.showMessages = false;
  }

  _getActiveChat;
  _getActiveThread;
  _chatRequest;

  ngOnInit() {
    console.log('chat init');

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
        console.log('getActiveChat', data, this);
      }
    );

    // this.chatMessages$ = this.chat$;

    // this.chatMessages$.subscribe(data => {
    //   console.log('fromStore.getChatMessages', data);
    // });

    this._getActiveThread = this.SidenavService.getActiveThread().subscribe(
      data => {
        // this.activeThread = data;
        // this.SidenavService.setOpenChat(true);
        this.request_id = data;
        this._chatRequest = this.store
          .select(fromStore.getSingleRequest, this.request_id)
          .subscribe(data => {
            this.chatRequest = data;
            this.chatRequest = this.chatRequest[0];
            console.log('fromStore.getSingleRequest', this.request_id, data);
          });
        console.log('Chat activeThread', data);
      }
    );

    this.newMessageForm = new FormGroup({
      messageText: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.messageMaxLength)
      ])
    });
  }

  ngOnDestroy() {
    this._getActiveChat.unsubscribe();
    this._getActiveThread.unsubscribe();
    this._chatRequest.unsubscribe();
    console.log('closing chat');
  }
}
