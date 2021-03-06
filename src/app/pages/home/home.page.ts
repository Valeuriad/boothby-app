import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { InstallService } from 'src/app/services/install/install.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  installLink = `https://slack.com/oauth/v2/authorize?client_id=${environment.slackClientId}&scope=app_mentions:read,channels:join,channels:read,chat:write,files:write,im:write,incoming-webhook,users:read&redirect_uri=${environment.webUrl}/home?install=true`;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private installService: InstallService
  ) {}

  async ngOnInit() {
    const toast = await this.toastController.create({
      duration: 5000,
      color: 'danger',
    });
    this.route.queryParams.subscribe((params) => {
      if (params && params.install && params.code) {
        this.loadingController
          .create({
            message: 'Installation en cours...',
          })
          .then((loading) => {
            loading.present();
            this.installService
              .slack(params.code, `${environment.webUrl}/home?install=true`)
              .subscribe(
                (res) => {
                  console.log(res);
                  loading.dismiss();
                },
                (error) => {
                  console.log(error);
                  toast.message = 'Boothby ne peut rejoindre ce workspace.';
                  toast.present();
                  loading.dismiss();
                }
              );
          });

        console.log(params);
      }
    });
  }
}
