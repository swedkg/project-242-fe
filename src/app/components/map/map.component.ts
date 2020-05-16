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
    private store: Store<fromStore.PlatformState>
  ) {}

  public initialZoomLevel = 16;
  public userPosition = { longitude: 0, latitude: 0 };
  public fitBounds: boolean = false;
  public markers; //: {} = [];
  public mapStyle = mapStyle;
  current_user: User;
  snazzyInfoWindowOpenId: number = 0;

  @ViewChild(AgmMap)
  @ViewChildren(AgmSnazzyInfoWindow)
  snazzyWindowChildren: QueryList<AgmSnazzyInfoWindow>;

  public agmMap: AgmMap;

  @HostListener("window:resize")
  onWindowResize() {
    // console.log("map log", "resize");
    // console.log(this);

    // this.fitBounds = true;
    this.agmMap.triggerResize();
  }

  markerClick(idx) {
    this.snazzyInfoWindowOpenId = idx;
    // console.log("click on ", idx);
  }

  toggleSnazzyInfoWindow() {
    this.snazzyWindowChildren
      .toArray()
      [this.snazzyInfoWindowOpenId]._closeInfoWindow();
  }

  inBoundMarkersList(message): void {
    // send message to subscribers via observable subject
    // console.log(message);
    this.helpRequestsService.inBoundMarkersList(message);
  }

  checkMarkersInBounds(event) {
    // console.clear();
    let counter = 0;
    let inBoundMarkers = [];
    let mapBounds = event.toJSON();
    // console.log(event, mapBounds, this);
    // console.log(this.markers);

    if (this.markers)
      this.markers.forEach((el) => {
        let position = { lat: el.lat, lng: el.lng };
        if (this.inRange(position.lng, mapBounds.west, mapBounds.east)) {
          if (this.inRange(position.lat, mapBounds.south, mapBounds.north)) {
            counter++; // console.log(el);
            // console.log(el);
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
    console.log("another marker added", event);
  }

  addUserLocation(position) {
    let coords = position.coords;
    this.userPosition = coords;
    // console.log("navigator.geolocation exists", coords, this);
    // TODO: remember to adjust filtering
    this.markers = this.markers.filter(function (m) {
      // console.log(m);
      return m.republished != 1;
    });
    this.markers.push({
      lat: coords.latitude,
      lng: coords.longitude,
      title: "You are here",
      isUser: true,
    });

    // console.log("map log", this.markers, this);
  }

  respondToRequest(id) {
    this.toggleSnazzyInfoWindow();
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

  // TODO: wireframes, at leasts 5, desktop and mobile
  // TODO: click on marker, displays info, status, button to fullfil
  // TODO: if >5 users = fulfilled, cannot republish

  ngOnInit() {
    // let self = this;

    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
    });

    this.helpRequestsService.getFulfilled().subscribe((data) => {
      console.log(data);
      // this.store.dispatch(new fromStore.LoadRequests());
      // setTimeout(() => {
      //   this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
      // }, 0);
    });

    this.helpRequestsService.getRepublish().subscribe((data) => {
      console.log(data);
      // this.store.dispatch(new fromStore.LoadRequests());
      // setTimeout(() => {
      //   this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
      // }, 0);
    });

    // this.store.dispatch(new fromStore.LoadRequests());

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
