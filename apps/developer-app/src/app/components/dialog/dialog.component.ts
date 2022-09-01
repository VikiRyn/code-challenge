import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Matrix } from '../../models/matrix';
import { MatrixService } from '../../services/matrix.service';

@Component({
  selector: 'tss-job-interview-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  selected: string;
  modes: string[];
  form: FormGroup;
  actionBtn = 'Create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: Matrix,
    private formBuilder: FormBuilder,
    private api: MatrixService,
    private dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      GSSN_OUTLETID: ['', Validators.required],
      GSSN_COMPANYID: ['', Validators.required],
      vd_name: [''],
      vfnr: [''],
      vfnr_hb: [''],
      mode: [''],
      sortorder: [''],
      brand: [''],
      status: [''],
      shortcut: [''],
      company_name: [''],
      branch: [''],
      street: [''],
      zip: [''],
      place: [''],
      region: [''],
      phone: [''],
      website: [''],
      center_name: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.form.controls['GSSN_OUTLETID'].setValue(this.editData.GSSN_OUTLETID);
      this.form.controls['GSSN_COMPANYID'].setValue(
        this.editData.GSSN_COMPANYID
      );
      this.form.controls['vd_name'].setValue(this.editData.vd_name);
      this.form.controls['vfnr'].setValue(this.editData.vfnr);
      this.form.controls['vfnr_hb'].setValue(this.editData.vfnr_hb);
      this.form.controls['mode'].setValue(this.editData.mode);
      this.form.controls['sortorder'].setValue(this.editData.sortorder);
      this.form.controls['brand'].setValue(this.editData.brand);
      this.form.controls['street'].setValue(this.editData.street);
      this.form.controls['zip'].setValue(this.editData.zip);
      this.form.controls['place'].setValue(this.editData.place);
      this.form.controls['region'].setValue(this.editData.region);
      this.form.controls['phone'].setValue(this.editData.phone);
      this.form.controls['website'].setValue(this.editData.website);
      this.form.controls['center_name'].setValue(this.editData.center_name);
    }
  }

  createMatrix() {
    if (!this.editData) {
      if (this.form.valid) {
        this.api.create(this.form.value).subscribe({
          next: (response) => {
            this.snackBar.open(
              'Matrix has been created successfully',
              undefined,
              {
                duration: 2000,
              }
            );
            this.form.reset();
            this.dialogRef.close('create');
          },
          error: () => {
            alert('Error while creation the matrix');
          },
        });
      }
    } else {
      this.updateMatrix();
    }
  }

  updateMatrix() {
    this.api.update(this.editData.id, this.form.value).subscribe({
      next: (result) => {
        this.snackBar.open('Matrix has been successfully updated', undefined, {
          duration: 2000,
        });
        this.form.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.snackBar.open('Error while updating the matrix', undefined, {
          duration: 2000,
        });
      },
    });
  }
}
