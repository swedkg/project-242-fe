import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from '../components/chat/chat.component';
import { MessagingComponent } from '../components/messaging/messaging.component';
import { MyRequestsComponent } from '../components/my-requests/my-requests.component';
import { MyResponsesComponent } from '../components/my-responses/my-responses.component';
import { MaterialModule } from './material.module';

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
