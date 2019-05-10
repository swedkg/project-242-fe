import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule
  ],
  declarations: []
})
export class MaterialModule {}
