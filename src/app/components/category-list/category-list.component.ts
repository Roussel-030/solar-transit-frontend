import { CategoryRequest } from "./../../types/Category";
import { Component, inject, OnInit } from "@angular/core";

import { CategoryService } from "../../services/category/category.service";
import { CategoryFormComponent } from "../category-form/category-form.component";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { Delete_Modal_Type } from "../../types/Delete_Modal";

@Component({
  selector: "app-category-list",
  imports: [CategoryFormComponent, ModalDeleteComponent],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.css",
})
export class CategoryListComponent implements OnInit {
  categoryList: CategoryRequest[] = [];
  category: CategoryRequest = { name: "" };
  titleModal?: string;
  isPopupVisible: boolean = false;
  categoryService = inject(CategoryService);
  isModalDelete: boolean = false;
  valueDeleteModal: Delete_Modal_Type = {
    title: "Deleting category",
    content: "Are you sure you want to delete the category ",
    valueBtnAccepted: "Yes, delete the category",
    valueBtnCancelled: "Cancel, keep the category",
    entityToDelete: null,
  };

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService
      .readCategory()
      .subscribe((categoryList) => (this.categoryList = categoryList.data));
  }

  openModalCategory(title?: string, category?: CategoryRequest) {
    if (category) {
      this.category = category;
    }
    if (title) {
      this.titleModal = title;
    }
    this.isPopupVisible = true;
  }

  closeModalCategory(isFetch: boolean = false) {
    this.isPopupVisible = false;
    this.init();
    if (isFetch) this.getCategory();
  }

  deleteCategory(categoryRequest: unknown) {
    if (this.isCategoryRequest(categoryRequest) && categoryRequest.id) {
      this.categoryService.deleteCategory(categoryRequest.id).subscribe({
        complete: () => {
          this.getCategory();
          this.closeModalDelete();
        },
      });
    }
  }

  openModalDelete(categoryRequest: CategoryRequest) {
    this.valueDeleteModal.entityToDelete = categoryRequest;
    this.isModalDelete = true;
  }

  closeModalDelete() {
    this.isModalDelete = false;
  }

  init() {
    this.category = { name: "" };
  }

  private isCategoryRequest(obj: unknown): obj is CategoryRequest {
    return typeof obj === "object" && obj !== null && "name" in obj;
  }
}
