import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dialog } from 'src/app/models/dialog/dialog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Dialog[]> {
    return this.http.get<Dialog[]>(`${environment.apiUrl}/dialogs`);
  }

  findById(id: number): Observable<Dialog> {
    return this.http.get<Dialog>(`${environment.apiUrl}/dialogs/${id}`);
  }

  create(dialog: any): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/dialogs`, dialog);
  }
  update(dialog: any): Observable<void> {
    return this.http.patch<void>(
      `${environment.apiUrl}/dialogs/${dialog.id}`,
      dialog
    );
  }
}
