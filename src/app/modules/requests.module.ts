import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkersListComponent } from '../components/markers-list/markers-list.component';
import { SubmitRequestContentComponent } from '../components/submit-request-content/submit-request-content.component';
import { SubmitRequestComponent } from '../components/submit-request/submit-request.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    MarkersListComponent,
    SubmitRequestComponent,
    SubmitRequestContentComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MarkersListComponent, SubmitRequestComponent],
  entryComponents: [SubmitRequestContentComponent]
})
export class RequestsModule {}
