import { Route } from "@angular/router";
import { menuNames } from "../util/menuNames";
import { CategoryListComponent } from "../components/category-list/category-list.component";
import { CategoryFormComponent } from "../components/category-form/category-form.component";

export const categoryRoutes: Route[] = [
  {
    path: "",
    children: [
      {
        path: menuNames.category.path,
        title: menuNames.category.name,
        component: CategoryListComponent,
      },
      {
        path: `${menuNames.category.path}/add`,
        title: menuNames.category.name,
        component: CategoryFormComponent,
      },
      {
        path: `${menuNames.category.path}/edit/:id`,
        title: menuNames.category.name,
        component: CategoryFormComponent,
      },
    ],
  },
];
