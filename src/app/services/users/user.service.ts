import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpService } from "../http/http.service";
import { RegisterRequest, UserResponse } from "../../types/Register";
import { Observable, tap, catchError, of } from "rxjs";

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class UserService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly userUrl = `${API_URL}/users/`;

  getUsers(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(this.userUrl, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  addUsers(request: RegisterRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(
        this.userUrl,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  updateUsers(request: RegisterRequest, id: number): Observable<UserResponse> {
    let params = new HttpParams().append("users_id", id);
    return this.http
      .put<UserResponse>(
        this.userUrl,
        request,
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  deleteUsers(id: number): Observable<UserResponse> {
    let params = new HttpParams().append("users_id", id);
    return this.http
      .delete<UserResponse>(
        this.userUrl,
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  geUsersById(id: number): Observable<UserResponse> {
    let params = new HttpParams().append("users_id", id);
    return this.http
      .get<UserResponse>(
        this.userUrl + "by_id/",
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
