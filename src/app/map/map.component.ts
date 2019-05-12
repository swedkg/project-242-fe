import { AgmMap } from '@agm/core';
import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { HelpRequestsService } from '../_services/index';

@NgModule({
  providers: [HelpRequestsService]
})
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  constructor(private helpRequestsService: HelpRequestsService) {}

  public markers; //: {} = [];

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  @HostListener('window:resize')
  onWindowResize() {
    // console.log('resize');
    // console.log(this);

    this.agmMap.triggerResize();
  }

  sendMessage(message): void {
    // send message to subscribers via observable subject
    console.log(message);
    this.helpRequestsService.sendMessage(message);
  }

  checkMarkersInBounds(event) {
    // console.clear();
    let counter = 0;
    let inBoundMarkers = [];
    // console.log(event);
    this.markers.forEach(el => {
      let position = { lat: el.lat, lng: el.lng };
      if (this.inRange(position.lng, event.ga.j, event.ga.l)) {
        if (this.inRange(position.lat, event.ma.j, event.ma.l)) {
          counter++; // console.log(el);
          inBoundMarkers.push(el);
        }
      }
    });
    console.log(counter + ' in bounds markers');
    this.sendMessage(inBoundMarkers);
  }

  inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  addUserLocation(position) {
    let coords = position.coords;
    console.log('navigator.geolocation exists', coords, this);
    this.markers.push({
      lat: coords.latitude,
      lng: coords.longitude,
      title: 'You are here'
    });
  }

  ngOnInit() {
    // let self = this;
    this.helpRequestsService.getHelpRequests().subscribe(data => {
      this.markers = data;
      this.markers = this.markers.filter(el => el.fulfilled === false);

      if (!!navigator.geolocation) {
        // Support
        navigator.geolocation.getCurrentPosition(
          this.addUserLocation.bind(this)
        );
      } else {
        // No support
      }

      console.log(this.markers);
    });

    // console.log(this.helpRequestsService.getHelpRequests());
  }
}
