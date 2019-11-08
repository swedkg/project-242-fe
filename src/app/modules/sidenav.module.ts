import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsModule } from './requests.module';
import { ResponsesModule } from './responses.module';
import { ChatComponent } from '../components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RequestsModule,
    ResponsesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RequestsModule, ResponsesModule, ChatComponent]
})
export class SidenavModule {}
