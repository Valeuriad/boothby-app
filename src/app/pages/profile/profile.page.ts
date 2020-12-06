import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  isLogin = false;
  attemptedSubmit = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: [
        authService.currentUserValue.email,
        [Validators.required, Validators.email],
      ],
      username: [authService.currentUserValue.username, [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      confirmation: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async save() {
    const controls = this.form.controls;
    this.attemptedSubmit = true;
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'warning',
    });
    if (
      this.form.valid &&
      (!controls['password'].value ||
        (controls['password'].value &&
          controls['password'].value === controls['confirmation'].value))
    ) {
      let user = {};
      user['email'] = controls['email'].value;
      user['username'] = controls['username'].value;
      if (controls['password'].value) {
        user['password'] = controls['password'].value;
      }

      this.loadingController
        .create({
          message: 'Sauvegarde en cours...',
        })
        .then((loading) => {
          loading.present();
          this.userService
            .updateById(this.authService.currentUserValue.id, user)
            .subscribe(
              () => {
                controls['password'].setValue('');
                controls['confirmation'].setValue('');
                loading.dismiss();
                this.attemptedSubmit = false;
              },
              (error) => {
                if (error.status == 401) {
                  toast.message = 'Identifiants incorrects';
                  toast.present();
                }
                this.attemptedSubmit = false;
                this.markFieldsDirty();
                loading.dismiss();
              }
            );
        });
    } else {
      this.markFieldsDirty();
    }
  }

  markFieldsDirty() {
    const controls = this.form.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  getColor(field) {
    if (this.form.controls[field].invalid) {
      return 'danger';
    } else {
      return 'dark';
    }
  }
}
