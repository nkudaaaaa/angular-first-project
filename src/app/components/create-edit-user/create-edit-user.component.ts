import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent {
  userForm: FormGroup;
  isEdit: boolean

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean, userInfo: IUser},
    private dialogRef: MatDialogRef<CreateEditUserComponent>
  ) {
    console.log(data.userInfo)
    if (data.userInfo) {
      this.userForm = this.fb.group({
        id: data.userInfo.id,
        name: data.userInfo.name,
        company: data.userInfo.company.name,
        street: data.userInfo.address.street,
        website: data.userInfo.website
      });
    }else {
    this.userForm = this.fb.group({
      id: 0,
      name: [''],
      company: [''],
      street: [''],
      website: ['']
    });
    }
    this.isEdit = this.data.isEdit
    if (this.data && this.data.userInfo?.name) {
      this.userForm.patchValue(this.data);
    }
  }

  saveUser(){
    const userData = this.userForm.value;
    this.dialogRef.close(userData)
  }
}
