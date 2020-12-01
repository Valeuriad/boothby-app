import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtResponseModel } from 'src/app/models/security/jwt.response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  slack(code: string, redirectUri: string): Observable<JwtResponseModel> {
    let request = {
      code: code,
      redirectUri: redirectUri,
    };
    return this.http.post<JwtResponseModel>(
      `${environment.apiUrl}/login/slack`,
      request
    );
  }
}
