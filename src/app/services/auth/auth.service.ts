import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtResponseModel } from 'src/app/models/jwt/response/jwt.response.model';
import { UserModel } from 'src/app/models/user/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<JwtResponseModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<JwtResponseModel>(
      JSON.parse(localStorage.getItem('boothby-jwt'))
    );
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      JSON.parse(localStorage.getItem('boothby-user'))
    );
  }

  public get currentTokenValue(): JwtResponseModel {
    return this.currentTokenSubject.value;
  }

  public set currentTokenValue(jwtResponse: JwtResponseModel) {
    this.currentTokenSubject.next(jwtResponse);
  }

  public get currentUserValue(): UserModel {
    var user = this.currentUserSubject.value;
    if (user == null) {
      return new UserModel();
    }
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

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

  whoami(subscribeFunc?, errorFunc?) {
    if (this.currentTokenValue != null) {
      this.http.get<UserModel>(`${environment.apiUrl}/whoami`).subscribe(
        (res) => {
          localStorage.setItem('boothby-user', JSON.stringify(res));
          this.currentUserSubject.next(res);
          if (subscribeFunc) {
            subscribeFunc();
          }
        },
        (error) => {
          console.log(error);
          if (errorFunc) {
            errorFunc(error);
          }
        }
      );
    }
  }

  logout() {
    localStorage.setItem('boothby-jwt', null);
    this.currentTokenValue = null;
    localStorage.setItem('boothby-user', null);
    this.currentUserValue = null;
  }
}
