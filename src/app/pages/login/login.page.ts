import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginLink = `https://slack.com/oauth/v2/authorize?client_id=522614420722.521877890336&user_scope=identity.avatar,identity.basic,identity.email,identity.team&redirect_uri=${environment.webUrl}/login`;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.code) {
        this.loadingController
          .create({
            message: 'Connexion en cours...',
          })
          .then((loading) => {
            loading.present();
            this.authService
              .slack(params.code, `${environment.webUrl}/login`)
              .subscribe(
                (res) => {
                  console.log(res);
                  if (res && res.token) {
                    // localStorage.setItem('jwt', JSON.stringify(res));
                    // this.authService.currentTokenValue = res;
                    // this.loginForm.reset();
                    // this.authService.whoami();
                    loading.dismiss();
                    // this.navCtrl.navigateRoot('/news');
                  }
                  // this.attemptedSubmit = false;
                },
                (error) => {
                  console.log(error);
                  // if(error.status == 401) {
                  //   toast.message = "Identifiants incorrects"
                  //   toast.present();
                  // }
                  // this.attemptedSubmit = false;
                  // this.markFieldsDirty();
                  loading.dismiss();
                }
              );
          });

        console.log(params);
      }
    });
  }
}
