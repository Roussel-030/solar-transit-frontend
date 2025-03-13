import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    };
    return httpOptions;
  }
}
