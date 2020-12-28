import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogLine } from 'src/app/models/dialog-item/dialog-line/dialog-line';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DialogLineService {
  constructor(private http: HttpClient) {}

  findAllByDialog(id: number): Observable<DialogLine[]> {
    return this.http.get<DialogLine[]>(
      `${environment.apiUrl}/dialogs/${id}/lines`
    );
  }

  create(line: any): Observable<DialogLine> {
    return this.http.post<DialogLine>(`${environment.apiUrl}/dialogs/lines`, line);
  }

  updateById(line: any): Observable<DialogLine> {
    return this.http.patch<DialogLine>(
      `${environment.apiUrl}/dialogs/lines/${line.id}`,
      line
    );
  }
}
