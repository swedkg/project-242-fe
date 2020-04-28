import { Injectable } from "@angular/core";
import { Observable, Subject, ReplaySubject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  constructor() {}

  private isSidenavOpen = new Subject<boolean>();
  private messagingSidenavOpened = new Subject<boolean>();
  private expanded = new BehaviorSubject<number>(0);
  private activeSidenavTab = new BehaviorSubject<number>(0);
  // private activeSidenavTab = new ReplaySubject<number>(1);
  private openChat = new ReplaySubject<boolean>(1);
  private activeThread = new BehaviorSubject<number>(0);
  private chat = new ReplaySubject<any>(1);

  public thread: number;
  public activeChat: any;

  public currentTab: number;

  public readonly tabs = {
    allRequests: 0,
    myResponses: 1,
    myRequests: 2,
  };

  setSidenavOpen(boolean) {
    this.isSidenavOpen.next(boolean);
  }

  getSidenavOpen(): Observable<boolean> {
    return this.isSidenavOpen;
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

  setCurrentTab(number) {
    this.currentTab = number;
  }

  getCurrentTab() {
    return this.currentTab;
  }

  setOpenChat(bool) {
    this.openChat.next(bool);
  }

  getOpenChat(): Observable<boolean> {
    return this.openChat;
  }

  setActiveThread(num) {
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
