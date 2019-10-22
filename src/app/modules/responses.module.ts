import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from '../components/messaging/messaging.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MaterialModule } from './material.module';
import { MyResponsesComponent } from '../components/my-responses/my-responses.component';
import { MyRequestsComponent } from '../components/my-requests/my-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    MessagingComponent,
    MyResponsesComponent,
    MyRequestsComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MessagingComponent]
})
export class ResponsesModule {}
