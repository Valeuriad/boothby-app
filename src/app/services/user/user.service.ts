import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSlack } from 'src/app/models/user-slack/user-slack';
import { UserModel } from 'src/app/models/user/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateById(id: number, userPartial: any): Observable<UserModel> {
    return this.http.patch<UserModel>(
      `${environment.apiUrl}/users/${id}`,
      userPartial
    );
  }

  find(id: number): Observable<UserSlack> {
    return this.http.get<UserSlack>(
      `${environment.apiUrl}/users/${id}/userslack`
    );
  }
}
