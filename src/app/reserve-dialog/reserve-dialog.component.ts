import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.css']
})
export class ReserveDialogComponent {
  searchDate: any | undefined;
  labName: any;
  constructor(
    public dialogRef: MatDialogRef<ReserveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.searchDate = data.searchDate;
    this.labName = data.labName;
}



save() {
  this.dialogRef.close(true);
}

close() {
  this.dialogRef.close();
}

}
