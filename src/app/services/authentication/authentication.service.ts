import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequest, RegisterResponse } from "../../types/Register";
import { catchError, Observable, of, tap } from "rxjs";
import { LoginRequest, LoginResponse } from "../../types/Login";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly apiUrlRegister = `${API_URL}/login/signup`;
  readonly apiUrlLogin = `${API_URL}/login/access-token`;

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(
        this.apiUrlRegister,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        this.apiUrlLogin,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
