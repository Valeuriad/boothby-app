import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { DialogLine } from 'src/app/models/dialog-line/dialog-line';
import { Dialog } from 'src/app/models/dialog/dialog';
import { DialogLineService } from 'src/app/services/dialog-line/dialog-line.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-edit-dialog-lines',
  templateUrl: './edit-dialog-lines.page.html',
  styleUrls: ['./edit-dialog-lines.page.scss'],
})
export class EditDialogLinesPage implements OnInit {
  form: FormGroup;
  lines: DialogLine[] = [];
  dialog: Dialog = new Dialog();
  idSaved: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dialogService: DialogService,
    private dialogLineService: DialogLineService
  ) {
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      lines: this.fb.array([]),
    });
  }

  newLineForm(line = { id: 0, text: '' }): FormGroup {
    return this.fb.group({
      id: line.id,
      text: line.text,
    });
  }

  linesForm(): FormArray {
    return this.form.get('lines') as FormArray;
  }

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

  refresh(callback) {
    var itemId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    let dialogRequest = this.dialogService.findById(itemId);
    let dialogLinesRequest = this.dialogLineService.findAllByDialog(itemId);
    forkJoin([dialogRequest, dialogLinesRequest]).subscribe(
      (results) => {
        this.dialog = results[0];
        this.lines = results[1];
        this.resetForm();
        results[1].forEach((line) => {
          this.linesForm().push(this.newLineForm(line));
        });
        callback();
      },
      (error) => callback(error)
    );
  }

  add() {
    let line = {};
    line['dialogId'] = this.dialog.id;
    line['text'] = '';
    this.dialogLineService.create(line).subscribe(() => {
      this.refresh(() => {});
    });
  }

  save(index) {
    let line = {};
    line['id'] = this.linesForm().controls[index]['controls']['id'].value;
    line['text'] = this.linesForm().controls[index]['controls']['text'].value;
    this.dialogLineService.updateById(line).subscribe(() => {
      this.idSaved = this.lines[index].id;
      setTimeout(() => {
        this.idSaved = 0;
      }, 2000);
    });
  }

  doRefresh(event) {
    this.refresh(() => {
      event.target.complete();
    });
  }

  blur(index) {
    this.save(index);
  }
}
