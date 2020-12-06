import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspaceSlack } from 'src/app/models/workspace-slack/workspace-slack';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceSlackService {
  constructor(private http: HttpClient) {}

  findById(id: number): Observable<WorkspaceSlack> {
    return this.http.get<WorkspaceSlack>(
      `${environment.apiUrl}/workspaces/slack/${id}`
    );
  }
}
