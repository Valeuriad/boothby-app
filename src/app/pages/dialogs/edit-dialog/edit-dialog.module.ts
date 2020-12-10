import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDialogPageRoutingModule } from './edit-dialog-routing.module';

import { EditDialogPage } from './edit-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDialogPageRoutingModule
  ],
  declarations: [EditDialogPage]
})
export class EditDialogPageModule {}
