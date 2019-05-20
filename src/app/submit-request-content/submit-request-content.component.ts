import {
  NgModule,
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HelpRequestsService } from '../_services/index';

@Component({
  selector: 'app-submit-request-content',
  templateUrl: './submit-request-content.component.html',
  styleUrls: ['./submit-request-content.component.scss']
})
export class SubmitRequestContentComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private helpRequestsService: HelpRequestsService
  ) {}
  public form: FormGroup;
  private geoCoder;
  newRequest: any = {};

  @ViewChild('autosize')
  autosize: CdkTextareaAutosize;

  @ViewChild('address')
  public searchElementRef: ElementRef;

  addNewRequest() {
    console.log('addNewRequest', this.newRequest);
    this.helpRequestsService.addNewRequest(this.newRequest);
  }

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(''),
      address: new FormControl(''),
      requestType: new FormControl('')
    });

    this.mapsAPILoader.load().then(() => {
      console.log('mapsAPILoader loaded');
    });

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.newRequest.lat = place.geometry.location.lat();
          this.newRequest.lng = place.geometry.location.lng();
          this.newRequest.title = 'New request title';
          this.newRequest.description = 'Some description here';
          console.log(typeof this.newRequest, this.newRequest);

          // this.zoom = 16;
        });
      });
    });
  }
}
