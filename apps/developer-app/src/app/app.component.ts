import { Component, OnInit, ViewChild } from '@angular/core';
import { Matrix } from './models/matrix';
import { MatrixService } from './services/matrix.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'tss-job-interview-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'GSSN_OUTLETID',
    'GSSN_COMPANYID',
    'vd_name',
    'vfnr',
    'mode',
    'company_name',
    'branch',
    'street',
    'zip',
    'region',
    'center_name',
    'action',
  ];
  dataSource: MatTableDataSource<Matrix>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: MatrixService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  title = 'developer-app';

  ngOnInit(): void {
    this.getAll();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'create') {
          this.getAll();
        }
      });
  }

  openConfirmDialog(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.snackBar.dismiss();
          this.delete(id);
        }
      });
  }

  getAll() {
    this.api.getAll().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.snackBar.open('Error while getting all', undefined, {
          duration: 2000,
        });
      },
    });
  }

  edit(row: Matrix) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAll();
        }
      });
  }

  delete(id: number) {
    this.api.delete(id).subscribe({
      next: (result) => {
        this.snackBar.open('Matrix has been successfully deleted', undefined, {
          duration: 2000,
        });
        this.getAll();
      },
      error: () => {
        this.snackBar.open('Error while deleting', undefined, {
          duration: 2000,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
