import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "../../services/loader/loader.service";
import { finalize } from "rxjs";
import { menuNames } from "../../util/menuNames";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  if (!req.url.includes(menuNames.login.path)) {
    loaderService.show();
  }

  return next(req).pipe(finalize(() => loaderService.hide()));
};
