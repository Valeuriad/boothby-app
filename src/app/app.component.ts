import { Component, OnInit } from '@angular/core';

import {
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public loginLink = `https://slack.com/oauth/v2/authorize?client_id=522614420722.521877890336&user_scope=identity.avatar,identity.basic,identity.email,identity.team&redirect_uri=${environment.webUrl}/home`;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Accueil',
      url: 'home',
      icon: 'home',
    },
    {
      title: 'Mon espace',
      url: 'edit-workspace',
      icon: 'grid',
      connected: true,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private toastController: ToastController,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined && path.length > 0) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.url.toLowerCase() === path.toLowerCase()
      );
    }
    this.whoami();
    const toast = await this.toastController.create({
      duration: 5000,
      color: 'danger',
    });
    this.route.queryParams.subscribe((params) => {
      if (params && params.code) {
        this.loadingController
          .create({
            message: 'Connexion en cours...',
          })
          .then((loading) => {
            loading.present();
            this.authService
              .slack(params.code, `${environment.webUrl}/home`)
              .subscribe(
                (res) => {
                  if (res && res.token) {
                    localStorage.setItem('boothby-jwt', JSON.stringify(res));
                    this.authService.currentTokenValue = res;
                    this.whoami();
                    loading.dismiss();
                    this.navCtrl.navigateRoot('/home');
                  }
                },
                (error) => {
                  console.log(error);
                  if (error.status == 401) {
                    toast.message = 'Echec de connexion';
                    toast.present();
                  }
                  loading.dismiss();
                }
              );
          });
      }
    });
  }

  whoami() {
    this.authService.whoami(
      () => {},
      (error) => {
        if (error.status === 401 || error.status === 404) {
          this.logout();
          this.navCtrl.navigateRoot('/home');
        }
      }
    );
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/home');
  }
}
