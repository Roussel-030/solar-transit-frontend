import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output
} from "@angular/core";
import { RegisterRequest } from "../../types/Register";
import { Role } from "../../types/Role";
import { UserService } from "../../services/users/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user-form",
  imports: [CommonModule, FormsModule],
  templateUrl: "./user-form.component.html",
  styleUrl: "./user-form.component.css"
})
export class UserFormComponent implements OnInit {
  constructor(private seriveUser: UserService) {}
  @Input() user!: RegisterRequest;
  @Input() editing: boolean = false;
  @Output() onCancel = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.user)
      this.user = {
        username: "",
        password: "",
        role: Role.USER
      };
    this.user.password = "";
  }

  onSubmit() {
    if (!this.editing)
      this.seriveUser.addUsers(this.user).subscribe({
        complete: () => {
          this.onCancel.emit(true);
        }
      });
    else if (this.user.id && this.user.password) {
      this.seriveUser.updateUsers(this.user, this.user.id).subscribe({
        complete: () => {
          this.onCancel.emit(true);
        }
      });
    }
  }

  closeMOdal() {
    this.onCancel.emit(false);
  }
}
