import { CategoryRequest } from "./../../types/Category";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: "app-category-form",
  imports: [FormsModule],
  templateUrl: "./category-form.component.html",
  styleUrl: "./category-form.component.css",
})
export class CategoryFormComponent implements OnInit {
  @Output() closeModalCategory = new EventEmitter<any>();
  @Input() titleModal?: string = "";
  @Input() categoryRequest: CategoryRequest = { name: "" };

  categoryService = inject(CategoryService);
  categoryRequestCopy: CategoryRequest = { name: "" };

  ngOnInit(): void {
    this.categoryRequestCopy = { ...this.categoryRequest };
  }

  closeModal() {
    this.closeModalCategory.emit(false);
  }

  onSubmit() {
    this.categoryRequest.name = this.categoryRequestCopy.name;
    if (this.titleModal && this.titleModal.includes("Add")) {
      this.categoryService
        .createCategory(this.categoryRequest)
        .subscribe(() => this.closeModalCategory.emit(true));
    } else {
      if (this.categoryRequest.id)
        this.categoryService
          .updateCategory(this.categoryRequest, this.categoryRequest.id)
          .subscribe(() => this.closeModalCategory.emit(true));
    }
  }
}
