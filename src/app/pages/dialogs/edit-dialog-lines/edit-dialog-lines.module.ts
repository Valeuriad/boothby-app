import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDialogLinesPageRoutingModule } from './edit-dialog-lines-routing.module';

import { EditDialogLinesPage } from './edit-dialog-lines.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditDialogLinesPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditDialogLinesPage],
})
export class EditDialogLinesPageModule {}
