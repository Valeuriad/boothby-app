import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDialogLinesPage } from './edit-dialog-lines.page';

const routes: Routes = [
  {
    path: '',
    component: EditDialogLinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDialogLinesPageRoutingModule {}
