import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequest, RegisterResponse } from "../../types/Register";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { LoginRequest, LoginResponse } from "../../types/Login";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { TokenService } from "../token/token.service";
import { Role } from "../../types/Role";
import { HeaderService } from "../header/header.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private tokenService: TokenService) {}

  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  private headerService = inject(HeaderService);
  readonly apiUrlRegister = `${API_URL}/login/signup`;
  readonly apiUrlLogin = `${API_URL}/login/access-token`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  checkAuthentication(): void {
    const token = this.tokenService.get_token();
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated);

    if (isAuthenticated) {
      const role = this.headerService.get_role(); // Assuming you have a method to get the role from the token
      this.isAdminSubject.next(role === Role.ADMIN);
    } else {
      this.isAdminSubject.next(false);
    }
  }

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
      .post<LoginResponse>(
        this.apiUrlLogin,
        body.toString(),
        this.httpOption.getHttpLoginOptions()
      )
      .pipe(
        tap((response) => {
          this.log(response);
          this.tokenService.set_token(response.access_token);
          this.headerService.set_header_role(response.role);

          this.isAuthenticatedSubject.next(true);
          this.isAdminSubject.next(response.role === Role.ADMIN);
        })
      );
  }

  logout() {
    this.tokenService.set_token("");
    window.location.reload();
  }

  private log(response: any) {
    console.table(response);
  }

  verify() {
    return this.http.post<RegisterRequest>(
      `${API_URL}/login/verify-token`,
      {},
      this.httpOption.getHttpOptions()
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
