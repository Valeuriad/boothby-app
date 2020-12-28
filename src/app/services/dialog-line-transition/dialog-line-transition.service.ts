import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogLineTransition } from 'src/app/models/dialog-item/dialog-line-transition/dialog-line-transition';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogLineTransitionService {
  constructor(private http: HttpClient) {}

  findAllByDialog(id: number): Observable<DialogLineTransition[]> {
    return this.http.get<DialogLineTransition[]>(
      `${environment.apiUrl}/dialogs/${id}/transitions`
    );
  }
}
