import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from '../components/messaging/messaging.component';
import { MaterialModule } from './material.module';
import { MyResponsesComponent } from '../components/my-responses/my-responses.component';
import { MyRequestsComponent } from '../components/my-requests/my-requests.component';

@NgModule({
  declarations: [MessagingComponent, MyResponsesComponent, MyRequestsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MessagingComponent]
})
export class ResponsesModule {}
