import { Routes } from "@angular/router";
import { menuNames } from "./util/menuNames";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./services/guard/auth.guard";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ListingListComponent } from "./components/listing-list/listing-list.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: menuNames.home.path,
    pathMatch: "full",
  },
  {
    path: menuNames.login.path,
    title: menuNames.login.name,
    loadComponent: () =>
      import("./pages/login/login.component").then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: menuNames.register.path,
    title: menuNames.register.name,
    loadComponent: () =>
      import("./pages/register/register.component").then(
        (module) => module.RegisterComponent
      ),
  },
  {
    path: menuNames.home.path,
    title: menuNames.home.name,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: menuNames.user.path,
    title: menuNames.user.name,
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: menuNames.listing.path,
    title: menuNames.listing.name,
    component: ListingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: menuNames.category.path,
    title: menuNames.category.name,
    component: CategoryListComponent,
    canActivate: [AuthGuard],
  },
];
