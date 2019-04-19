import { AgmMap } from '@agm/core';
import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { HelpRequestsService } from '../help-requests.service';

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
  constructor(private HelpRequestsService: HelpRequestsService) {}

  title: string = 'My first AGM project';

  public markers: {} = [];

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  @HostListener('window:resize')
  onWindowResize() {
    // console.log('resize');
    // console.log(this);

    this.agmMap.triggerResize();
  }

  ngOnInit() {
    this.HelpRequestsService.getHelpRequests().subscribe(data => {
      this.markers = data;
      console.log(this.markers);
    });
    console.log(this.HelpRequestsService.getHelpRequests());
  }
}
