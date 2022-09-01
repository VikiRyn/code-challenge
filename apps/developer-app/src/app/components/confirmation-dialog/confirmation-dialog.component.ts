import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'tss-job-interview-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  message = 'Are you sure to delete?';
  confirmButtonText = 'Delete';
  cancelButtonText = 'Cancel';
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
