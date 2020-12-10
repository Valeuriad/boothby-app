import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WorkspaceSlack } from 'src/app/models/workspace-slack/workspace-slack';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkspaceSlackService } from 'src/app/services/workspace/workspace-slack.service';

@Component({
  selector: 'app-edit-workspace',
  templateUrl: './edit-workspace.page.html',
  styleUrls: ['./edit-workspace.page.scss'],
})
export class EditWorkspacePage implements OnInit {
  public workspace: WorkspaceSlack = new WorkspaceSlack();

  constructor(
    private loadingController: LoadingController,
    private profileService: ProfileService,
    private workspaceSlackService: WorkspaceSlackService
  ) {}

  ngOnInit() {
    this.loadingController
      .create({
        message: 'Chargement...',
      })
      .then((loading) => {
        loading.present();
        this.refresh(() => {
          loading.dismiss();
        });
      });
  }

  doRefresh(event) {
    this.refresh(() => {
      event.target.complete();
    });
  }

  refresh(callback) {
    this.profileService.getUserSlack().subscribe((data) => {
      this.workspaceSlackService.findById(data[0].workspaceId).subscribe(
        (data) => {
          this.workspace = data;
          callback();
        },
        (error) => callback()
      );
    });
  }
}
