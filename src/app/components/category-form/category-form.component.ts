import { CategoryRequest } from "./../../types/Category";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { menuNames } from "../../util/menuNames";
import { FormsModule } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: "app-category-form",
  imports: [FormsModule],
  templateUrl: "./category-form.component.html",
  styleUrl: "./category-form.component.css",
})
export class CategoryFormComponent implements OnInit {
  isAddForm: boolean = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  categoryRequest: CategoryRequest = { name: "" };

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes("add");
    if (!this.isAddForm) {
      this.getCategoryById();
    }
  }

  goToCategory() {
    this.router.navigate([menuNames.category.path]);
  }

  getCategoryById() {
    const categoryId: number | null = Number(
      this.route.snapshot.paramMap.get("id")
    );
    if (categoryId) {
      this.categoryService
        .getByIdCategory(categoryId)
        .subscribe((category) => (this.categoryRequest = category));
    }
  }

  onSubmit() {
    if (this.isAddForm) {
      this.categoryService
        .createCategory(this.categoryRequest)
        .subscribe(() => this.goToCategory());
    } else {
      this.categoryService
        .updateCategory(this.categoryRequest)
        .subscribe(() => this.goToCategory());
    }
  }
}
