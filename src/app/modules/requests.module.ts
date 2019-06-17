import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from '../components/requests/requests.component';
import { MaterialModule } from './material.module';
import { SubmitRequestComponent } from '../components/submit-request/submit-request.component';
import { SubmitRequestContentComponent } from '../components/submit-request-content/submit-request-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';

@NgModule({
  declarations: [
    RequestsComponent,
    SubmitRequestComponent,
    SubmitRequestContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('requests', reducers)
  ],
  exports: [RequestsComponent, SubmitRequestComponent],
  entryComponents: [SubmitRequestContentComponent]
})
export class RequestsModule {}
