import { Injectable } from "@angular/core";
import { Observable, Subject, ReplaySubject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  constructor() {}

  private isSidenavOpen = new Subject<boolean>();
  private expanded = new BehaviorSubject<number>(0);
  private activeSidenavTab = new BehaviorSubject<number>(0);
  // private activeSidenavTab = new ReplaySubject<number>(1);
  private openChat = new ReplaySubject<boolean>(1);
  private activeThread = new BehaviorSubject<number>(0);

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
    this.activeThread.next(num);
  }

  getActiveThread() {
    return this.activeThread;
  }
}
