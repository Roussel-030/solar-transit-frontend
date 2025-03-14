import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ToastService } from "../toast/toast.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService); // Inject the ToastService

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = "An error occurred";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.detail}`;
      } else {
        console.log("error error", error);

        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.detail}`;
        if (error.error && error.error.detail) {
          errorMessage = error.error.detail;
        }
      }

      // Display the error in the toast
      toastService.showError(errorMessage);

      // Re-throw the error to propagate it further
      return throwError(() => error);
    })
  );
};
