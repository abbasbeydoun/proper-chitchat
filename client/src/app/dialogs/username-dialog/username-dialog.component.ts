import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.css']
})
export class UsernameDialogComponent implements OnInit {

  // private username: string;

  username = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<UsernameDialogComponent>){}

  ngOnInit() {}

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must choose a username' :
      this.username.hasError('username') ? 'Not a valid email' : '';
  }

  closeDialog(){
    this.dialogRef.close(this.username.value);
  }

}
