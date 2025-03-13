import { CategoryRequest } from "./../../types/Category";
import { Component, inject, OnInit } from "@angular/core";

import { CategoryService } from "../../services/category/category.service";

import { menuNames } from "../../util/menuNames";
import { Router } from "@angular/router";

@Component({
  selector: "app-category-list",
  imports: [],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.css",
})
export class CategoryListComponent implements OnInit {
  categoryList: CategoryRequest[] = [];
  router = inject(Router);
  categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categoryService
      .readCategory()
      .subscribe((categoryList) => (this.categoryList = categoryList.data));
  }

  deleteCategory(categoryRequest: CategoryRequest) {
    if (categoryRequest.id) {
      this.categoryService
        .deleteCategory(categoryRequest.id)
        .subscribe(() => console.log("Success"));
    }
  }

  goToAddCategory() {
    this.router.navigate([menuNames.category.path, "add"]);
  }

  goToEditCategory(categoryRequest: CategoryRequest) {
    if (categoryRequest.id) {
      this.router.navigate([
        menuNames.category.path,
        "edit",
        categoryRequest.id,
      ]);
    }
  }
}
