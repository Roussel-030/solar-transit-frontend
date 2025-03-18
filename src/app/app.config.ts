import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorInterceptor } from "./services/interceptor/error.interceptor";
import { ToastService } from "./services/toast/toast.service";
import { loaderInterceptor } from "./interceptors/loader/loader.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loaderInterceptor])),
    ToastService,
  ],
};
