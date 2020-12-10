import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Dialog } from 'src/app/models/dialog/dialog';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.page.html',
  styleUrls: ['./edit-dialog.page.scss'],
})
export class EditDialogPage implements OnInit {
  form: FormGroup;
  dialog: Dialog = new Dialog();
  attemptedSubmit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private dialogService: DialogService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    var itemId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    const controls = this.form.controls;
    if (itemId > 0) {
      this.loadingController
        .create({
          message: 'Chargement...',
        })
        .then((loading) => {
          loading.present();
          this.dialogService.findById(itemId).subscribe(
            (data) => {
              this.dialog = data;
              controls['name'].setValue(this.dialog.name);
              loading.dismiss();
            },
            (error) => {
              console.log(error);
              loading.dismiss();
            }
          );
        });
    }
  }

  async save() {
    const controls = this.form.controls;
    this.attemptedSubmit = true;
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'warning',
    });
    if (this.form.valid) {
      let dialog = {};
      dialog['id'] = this.dialog.id;
      dialog['name'] = controls['name'].value;

      this.loadingController
        .create({
          message: 'Sauvegarde en cours...',
        })
        .then((loading) => {
          loading.present();
          if (this.dialog.id > 0) {
            this.dialogService.update(dialog).subscribe(
              () => {
                loading.dismiss();
                this.attemptedSubmit = false;
              },
              (error) => {
                this.error(error, toast, loading);
              }
            );
          } else {
            this.dialogService.create(dialog).subscribe(
              () => {
                loading.dismiss();
                this.attemptedSubmit = false;
              },
              (error) => {
                this.error(error, toast, loading);
              }
            );
          }
        });
    } else {
      this.markFieldsDirty();
    }
  }

  error(error, toast, loading) {
    console.log(error);
    toast.message = 'Une erreur est survenue';
    toast.present();
    this.attemptedSubmit = false;
    this.markFieldsDirty();
    loading.dismiss();
  }

  markFieldsDirty() {
    const controls = this.form.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }
}
