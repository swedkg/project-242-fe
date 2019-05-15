import { Component, OnInit } from '@angular/core';
import { SubmitRequestContentComponent } from '../submit-request-content/submit-request-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.scss']
})
export class SubmitRequestComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitRequestContentComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {}
}
