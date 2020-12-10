import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Dialog } from 'src/app/models/dialog/dialog';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-list-dialogs',
  templateUrl: './list-dialogs.page.html',
  styleUrls: ['./list-dialogs.page.scss'],
})
export class ListDialogsPage implements OnInit {
  public dialogs: Dialog[] = [];

  constructor(
    private loadingController: LoadingController,
    private dialogService: DialogService
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
    this.dialogService.findAll().subscribe(
      (data) => {
        this.dialogs = data;
        callback();
      },
      (error) => callback(error)
    );
  }
}
