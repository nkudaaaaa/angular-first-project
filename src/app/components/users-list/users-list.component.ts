import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(protected usersService: UsersService, private dialog: MatDialog) { }

  openCreateEditUserDialog(isEdit: boolean, user?: IUser): void {
    const userInfo: IUser | null = user ? {
      id: user.id,
      name: user.name,
      address: {street: user.address.street},
      website: user.website,
      company: {name: user.company.name},
    } : null;

    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '400px',
      data: { isEdit, userInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: IUser = {
          id: result.id,
          name: result.name,
          address: {street: result.street},
          company: {name: result.company},
          website: result.website
        }
        isEdit ? this.usersService.editUser(data) : this.usersService.addUser(data);
      }
    });
  }


  ngOnInit(): void {
    this.usersService.loadUsersFromLocalStorage()
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId);
  }

  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
}
