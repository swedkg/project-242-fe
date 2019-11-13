import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() {}

  private isSidenavOpen = new Subject<boolean>();
  private messagingSidenavOpened = new Subject<boolean>();
  private expanded = new Subject<number>();
  private activeSidenavTab = new ReplaySubject<number>(1);
  private openChat = new ReplaySubject<boolean>(1);
  private activeThread = new ReplaySubject<number>(1);
  private chat = new Subject<any>();

  public thread: number;
  public activeChat: any;

  setSidenavOpen(boolean) {
    this.isSidenavOpen.next(boolean);
  }
  isRequestSidenavOpened(): Observable<boolean> {
    return this.isSidenavOpen.asObservable();
  }
  setMessagingSidenavOpened(boolean) {
    this.messagingSidenavOpened.next(boolean);
  }
  isMessagingSidenavOpened(): Observable<boolean> {
    return this.messagingSidenavOpened.asObservable();
  }
  setExpandedAccordionPanel(id) {
    this.expanded.next(id);
  }
  getExpandedAccordionPanel(): Observable<number> {
    return this.expanded.asObservable();
  }

  setActiveSidenavTab(num) {
    this.activeSidenavTab.next(num);
  }

  getActiveSidenavTab(): Observable<number> {
    return this.activeSidenavTab.asObservable();
  }

  setOpenChat(bool) {
    this.openChat.next(bool);
  }

  getOpenChat(): Observable<boolean> {
    return this.openChat;
  }

  setActiveThread(num) {
    // this.thread = num;
    this.activeThread.next(num);
  }

  getActiveThread() {
    return this.activeThread;
  }

  setActiveChat(chat) {
    // this.activeChat = chat;
    this.chat.next(chat);
  }

  getActiveChat(): Observable<any> {
    return this.chat;
  }
}
