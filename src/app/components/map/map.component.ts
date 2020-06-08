import { AgmMap } from "@agm/core";
import { AgmSnazzyInfoWindow } from "@agm/snazzy-info-window";
import {
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { User } from "../../_models/user";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { mapStyle } from "./mapStyle";
import { MessageFlowService } from "../../_services/message-flow.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit {
  isSnazzyInfoWindowOpened: boolean;
  constructor(
    private helpRequestsService: HelpRequestsService,
    private SidenavService: SidenavService,
    private UserService: UserService,
    private store: Store<fromStore.PlatformState>,
    private MessageFlowService: MessageFlowService
  ) {}

  public initialZoomLevel = 16;
  public userPosition = { longitude: 0, latitude: 0 };
  public fitBounds: boolean = false;
  public markers; //: {} = [];
  public mapStyle = mapStyle;
  current_user: User;
  snazzyInfoWindowOpenId: number = 0;
  request_id: number;

  @ViewChild(AgmMap)
  public agmMap: AgmMap;
  @ViewChildren(AgmSnazzyInfoWindow)
  snazzyWindowChildren: QueryList<AgmSnazzyInfoWindow>;

  @HostListener("window:resize")
  onWindowResize() {
    // // console.log("map log", "resize");
    // // console.log(this);

    // this.fitBounds = true;
    this.agmMap.triggerResize();
  }

  markerClick(idx) {
    this.snazzyInfoWindowOpenId = idx;
    // // console.log("click on ", idx);
  }

  toggleSnazzyInfoWindow() {
    this.snazzyWindowChildren.toArray()[this.snazzyInfoWindowOpenId][
      "_closeInfoWindow()"
    ];
  }

  inBoundMarkersList(message): void {
    // send message to subscribers via observable subject
    // // console.log(message);
    this.helpRequestsService.inBoundMarkersList(message);
  }

  checkMarkersInBounds(event) {
    // console.clear();
    let counter = 0;
    let inBoundMarkers = [];
    let mapBounds = event.toJSON();
    // // console.log(event, mapBounds, this);
    // // console.log(this.markers);

    if (this.markers)
      this.markers.forEach((el) => {
        let position = { lat: el.lat, lng: el.lng };
        if (this.inRange(position.lng, mapBounds.west, mapBounds.east)) {
          if (this.inRange(position.lat, mapBounds.south, mapBounds.north)) {
            counter++; // // console.log(el);
            // // console.log(el);
            inBoundMarkers.push(el);
          }
        }
      });
    this.inBoundMarkersList(inBoundMarkers);
  }

  inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  addMarker(event) {
    // console.log("another marker added", event);
  }

  addUserLocation(position) {
    let coords = position.coords;
    this.userPosition = coords;
    // // console.log("navigator.geolocation exists", coords, this);
    this.markers = this.markers.filter(function (m) {
      // // console.log(m);
      return m.republished == 0;
    });
    this.markers.push({
      lat: coords.latitude,
      lng: coords.longitude,
      title: "You are here",
      isUser: true,
    });

    // // console.log("map log", this.markers, this);
  }

  goToMessages(id, tab) {
    this.SidenavService.setSidenavOpen(true);
    this.SidenavService.setActiveThread(id);
    this.SidenavService.setActiveSidenavTab(tab);
    this.SidenavService.setExpandedAccordionPanel(id);
    // this.SidenavService.setOpenChat(true);
    // this.SidenavService.setSidenavOpen(false);
    // this.SidenavService.setMessagingSidenavOpened(true);
    setTimeout(function () {}.bind(this), 100);
  }

  respondToRequest(id) {
    this.toggleSnazzyInfoWindow();
    this.MessageFlowService.respondToRequest(id);
    this.request_id = id;
    return null;
    this.SidenavService.setExpandedAccordionPanel(id);
    this.SidenavService.setSidenavOpen(false);
    // this.SidenavService.setMessagingSidenavOpened(true);
    this.SidenavService.setActiveSidenavTab(
      this.SidenavService.tabs.allRequests
    );
  }

  get isLoggedIn() {
    return this.UserService.isLoggedIn;
  }

  ngOnInit() {
    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
    });

    // this.store.dispatch(new fromStore.LoadRequests());

    this.MessageFlowService.getResponseToRequest().subscribe((data) => {
      if (data === 201) {
        // this.store.dispatch(new fromStore.LoadRequests());
        this.SidenavService.setSidenavOpen(true);

        // this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
        setTimeout(
          function () {
            this.SidenavService.setActiveSidenavTab(
              this.SidenavService.tabs.myResponses
            );
            this.SidenavService.setActiveThread(this.request_id);
            this.SidenavService.setExpandedAccordionPanel(this.request_id);
            // this.SidenavService.setOpenChat(true);
          }.bind(this),
          0
        );

        // console.log("getResponseToRequest", data, this);
      }
    });

    this.store.select(fromStore.getAllRequests).subscribe((data) => {
      this.markers = data;

      this.fitBounds = this.markers.length == 0 ? false : true;

      if (!!navigator.geolocation) {
        // Support
        navigator.geolocation.getCurrentPosition(
          this.addUserLocation.bind(this)
        );
      } else {
        // No support
      }
    });
  }
}
