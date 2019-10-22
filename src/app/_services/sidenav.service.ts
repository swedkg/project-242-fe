import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() {}

  private requestSidenavOpened = new Subject<boolean>();
  private messagingSidenavOpened = new Subject<boolean>();
  private expanded = new Subject<number>();
  private activeMessagingTab = new Subject<number>();
  private openChat = new Subject<boolean>();

  setRequestSidenavOpened(boolean) {
    this.requestSidenavOpened.next(boolean);
  }
  isRequestSidenavOpened(): Observable<boolean> {
    return this.requestSidenavOpened.asObservable();
  }
  setMessagingSidenavOpened(boolean) {
    this.messagingSidenavOpened.next(boolean);
  }
  isMessagingSidenavOpened(): Observable<boolean> {
    return this.messagingSidenavOpened.asObservable();
  }
  setExpanded(id) {
    this.expanded.next(id);
  }
  getExpanded(): Observable<number> {
    return this.expanded.asObservable();
  }

  setActiveMessagingTab(num) {
    this.activeMessagingTab.next(num);
  }

  getActiveMessagingTab(): Observable<number> {
    return this.activeMessagingTab.asObservable();
  }

  setOpenChat(bool) {
    this.openChat.next(bool);
  }

  getOpenChat(): Observable<boolean> {
    return this.openChat;
  }
}
