import { Component, OnInit } from "@angular/core";
import { RegisterRequest } from "../../types/Register";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/users/user.service";
import { UserFormComponent } from "../user-form/user-form.component";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { Delete_Modal_Type } from "../../types/Delete_Modal";

@Component({
  selector: "app-user-profile",
  imports: [CommonModule, FormsModule, UserFormComponent, ModalDeleteComponent],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent implements OnInit {
  isModalOpen: boolean = false;
  editing: boolean = false;
  selectedUser!: RegisterRequest;
  isModalDelete: boolean = false;
  valueDeleteModal: Delete_Modal_Type = {
    title: "Deleting User",
    content: "Are you sure you want to delete the user ",
    valueBtnAccepted: "Yes, delete the user",
    valueBtnCancelled: "Cancel, keep the user",
    entityToDelete: null,
  };

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

  deleteUser(user: unknown) {
    if (this.isRegisterRequest(user) && user.id) {
      this.userService.deleteUsers(user.id).subscribe({
        complete: () => {
          this.getUser();
          this.closeModalDelete();
        },
      });
    }
  }

  getUser() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
      },
    });
  }
  closeModal(isfetch: boolean = false) {
    this.isModalOpen = false;
  }

  addUser() {
    this.editing = false;
    this.isModalOpen = true;
  }

  openModalDelete(user: RegisterRequest) {
    this.valueDeleteModal.entityToDelete = user;
    this.isModalDelete = true;
  }

  closeModalDelete() {
    this.isModalDelete = false;
  }

  private isRegisterRequest(obj: unknown): obj is RegisterRequest {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "username" in obj &&
      "password" in obj &&
      "role" in obj
    );
  }
}
