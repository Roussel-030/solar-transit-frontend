import { Component, OnInit } from "@angular/core";
import { RegisterRequest } from "../../types/Register";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/users/user.service";
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: "app-user-profile",
  imports: [CommonModule, FormsModule, UserFormComponent],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css"
})
export class UserProfileComponent implements OnInit {
  isModalOpen: boolean = false;
  editing: boolean = false;
  selectedUser!: RegisterRequest;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUser();
  }
  users: RegisterRequest[] = [];

  updateUser(user: RegisterRequest) {
    this.selectedUser = user;
    this.editing = true;
    this.isModalOpen = true;
  }

  deleteUser(user: RegisterRequest) {
    if (user.id)
      this.userService.deleteUsers(user.id).subscribe({
        complete: () => {
          this.getUser();
        }
      });
  }

  getUser() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
      }
    });
  }
  closeModal(isfetch: boolean = false) {
    this.isModalOpen = false;
  }

  addUser() {
    this.editing = false;
    this.isModalOpen = true;
  }
}
