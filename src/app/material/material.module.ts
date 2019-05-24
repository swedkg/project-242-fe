import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatSelectModule,
  MatRadioModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule
  ],
  declarations: []
})
export class MaterialModule {}
