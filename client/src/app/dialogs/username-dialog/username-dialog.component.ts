import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.css']
})
export class UsernameDialogComponent implements OnInit {

  username = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<UsernameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {}



  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must choose a username';
    }
  }

  closeDialog(){
    this.dialogRef.close(this.username.value);
  }

}
