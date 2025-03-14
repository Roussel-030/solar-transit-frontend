import { CategoryRequest } from "./../../types/Category";
import { Component, inject, OnInit } from "@angular/core";

import { CategoryService } from "../../services/category/category.service";
import { CategoryFormComponent } from "../category-form/category-form.component";

@Component({
  selector: "app-category-list",
  imports: [CategoryFormComponent],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.css",
})
export class CategoryListComponent implements OnInit {
  categoryList: CategoryRequest[] = [];
  category: CategoryRequest = { name: "" };
  titleModal?: string;
  isPopupVisible: boolean = false;
  categoryService = inject(CategoryService);

  ngOnInit(): void {
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

  closeModalCategory() {
    this.isPopupVisible = false;
    this.init();
  }

  deleteCategory(categoryRequest: CategoryRequest) {
    if (categoryRequest.id) {
      this.categoryService
        .deleteCategory(categoryRequest.id)
        .subscribe(() => console.log("Success"));
    }
  }

  init() {
    this.category = { name: "" };
  }
}
