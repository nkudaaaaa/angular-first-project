import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from "../../models/user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent{
  constructor() { }

  @Input() user!: IUser

  @Output() onEdited: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteUserEvent: EventEmitter<number> = new EventEmitter<number>();
  deleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  onEdit(): void {
    this.onEdited.emit(this.user.id)
  }

}
