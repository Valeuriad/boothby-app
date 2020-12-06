import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstallService {
  constructor(private http: HttpClient) {}

  slack(code: string, redirectUri: string): Observable<void> {
    let request = {
      code: code,
      redirectUri: redirectUri,
    };
    return this.http.post<void>(`${environment.apiUrl}/install/slack`, request);
  }
}
