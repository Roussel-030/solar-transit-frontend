import { CategoryRequest } from "./../../types/Category";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: "app-category-form",
  imports: [FormsModule],
  templateUrl: "./category-form.component.html",
  styleUrl: "./category-form.component.css",
})
export class CategoryFormComponent {
  @Output() closeModalCategory = new EventEmitter<void>();
  @Input() titleModal?: string = "";
  @Input() categoryRequest: CategoryRequest = { name: "" };
  categoryService = inject(CategoryService);

  closeModal() {
    this.closeModalCategory.emit();
  }

  onSubmit() {
    if (this.titleModal && this.titleModal.includes("Add")) {
      this.categoryService
        .createCategory(this.categoryRequest)
        .subscribe(() => this.closeModal());
    } else {
      this.categoryService
        .updateCategory(this.categoryRequest)
        .subscribe(() => this.closeModal());
    }
  }
}
