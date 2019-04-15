import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  exports: [MatSidenavModule, MatButtonModule],
  declarations: []
})
export class MaterialModule {}
