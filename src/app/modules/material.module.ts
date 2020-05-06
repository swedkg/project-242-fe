import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";

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
    MatTabsModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatMenuModule,
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
    MatTabsModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  declarations: [],
})
export class MaterialModule {}
