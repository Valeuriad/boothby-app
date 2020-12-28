import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { DialogLineTransition } from 'src/app/models/dialog-item/dialog-line-transition/dialog-line-transition';
import { DialogLine } from 'src/app/models/dialog-item/dialog-line/dialog-line';
import { Dialog } from 'src/app/models/dialog/dialog';
import { DialogLineTransitionService } from 'src/app/services/dialog-line-transition/dialog-line-transition.service';
import { DialogLineService } from 'src/app/services/dialog-line/dialog-line.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-edit-dialog-lines',
  templateUrl: './edit-dialog-lines.page.html',
  styleUrls: ['./edit-dialog-lines.page.scss'],
})
export class EditDialogLinesPage implements OnInit {
  form: FormGroup;
  tree: DialogLine = new DialogLine();
  lines: DialogLine[] = [];
  transitions: DialogLineTransition[] = [];
  dialog: Dialog = new Dialog();
  idSaved = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dialogService: DialogService,
    private dialogLineService: DialogLineService,
    private dialogLineTransitionService: DialogLineTransitionService
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
    const itemId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    const dialogRequest = this.dialogService.findById(itemId);
    const dialogLinesRequest = this.dialogLineService.findAllByDialog(itemId);
    const dialogLinesTransitionsRequest = this.dialogLineTransitionService.findAllByDialog(itemId);
    forkJoin([dialogRequest, dialogLinesRequest, dialogLinesTransitionsRequest]).subscribe(
      (results) => {
        this.dialog = results[0];
        this.lines = results[1];
        this.transitions = results[2];
        this.buildTree();
        this.resetForm();
        results[1].forEach((line) => {
          this.linesForm().push(this.newLineForm(line));
        });
        callback();
      },
      (error) => callback(error)
    );
  }

  buildTree() {
    this.tree = this.lines.find(firstLine => firstLine.id === this.dialog.firstLine);
    if(this.tree !== undefined && this.tree.transition !== undefined) {
      if(this.tree.transition !== null) {
        console.log(this.tree.transition.next);
      }
    }
    console.log(this.tree);
  }

  add() {
    const line = {};
    line['dialogId'] = this.dialog.id;
    line['text'] = '';
    this.dialogLineService.create(line).subscribe(dialogLineSaved => {
      if(this.dialog.firstLine === null) {
        const dialog = {};
        dialog['id'] = this.dialog.id;
        dialog['firstLine'] = dialogLineSaved.id;
        this.dialogService.update(dialog).subscribe(() => {
          this.refresh(() => {});
        });
      } else {
        this.refresh(() => {});
      }
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
