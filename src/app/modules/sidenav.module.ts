import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsModule } from './requests.module';
import { ResponsesModule } from './responses.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RequestsModule, ResponsesModule],
  exports: [RequestsModule, ResponsesModule]
})
export class SidenavModule {}
