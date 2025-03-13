import { Component, inject, OnInit } from "@angular/core";
import { CategoryRequest } from "../../types/Category";
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: "app-category-list",
  imports: [],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.css",
})
export class CategoryListComponent implements OnInit {
  categoryList: CategoryRequest[] = [];
  categoryService = inject(CategoryService);

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}
