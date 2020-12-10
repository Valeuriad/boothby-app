import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDialogsPageRoutingModule } from './list-dialogs-routing.module';

import { ListDialogsPage } from './list-dialogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDialogsPageRoutingModule
  ],
  declarations: [ListDialogsPage]
})
export class ListDialogsPageModule {}
