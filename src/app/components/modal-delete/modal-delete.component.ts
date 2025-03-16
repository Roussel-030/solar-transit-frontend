import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Delete_Modal_Type } from "../../types/Delete_Modal";
import { CategoryRequest } from "../../types/Category";
import { RegisterRequest } from "../../types/Register";

@Component({
  selector: "app-modal-delete",
  imports: [],
  templateUrl: "./modal-delete.component.html",
  styleUrl: "./modal-delete.component.css",
})
export class ModalDeleteComponent {
  @Input() valueDeleteModal: Delete_Modal_Type | null = null;
  @Output() closeModalDelete = new EventEmitter();
  @Output() deleteEntity = new EventEmitter<
    CategoryRequest | RegisterRequest
  >();

  closeModal() {
    this.closeModalDelete.emit();
  }

  acceptDeleteEntity() {
    if (this.valueDeleteModal && this.valueDeleteModal.entityToDelete) {
      this.deleteEntity.emit(this.valueDeleteModal.entityToDelete);
    }
  }
}
