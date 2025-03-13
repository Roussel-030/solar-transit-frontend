import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequest, RegisterResponse } from "../../types/Register";
import { catchError, Observable, of, tap } from "rxjs";
import { LoginRequest, LoginResponse } from "../../types/Login";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { TokenService } from "../token/token.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private tokenService: TokenService) {}
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
        tap((response) => {
          this.log(response);
          this.tokenService.set_token(response.access_token);
        }),
        catchError((error) => this.handleError(error, null))
      );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    let body = new URLSearchParams();
    body.set("username", request.username);
    body.set("password", request.password);
    return this.http
      .post<RegisterResponse>(
        this.apiUrlLogin,
        body.toString(),
        this.httpOption.getHttpLoginOptions()
      )
      .pipe(
        tap((response) => {
          this.log(response);
          this.tokenService.set_token(response.access_token);
        }),
        catchError((error) => this.handleError(error, null))
      );
  }

  private log(response: any) {
    console.table(response);
  }

  verify() {
    return this.http.post<RegisterRequest>(
      `${API_URL}/login/test-token`,
      {},
      this.httpOption.getHttpOptions()
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
