import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDialogsPage } from './list-dialogs.page';

const routes: Routes = [
  {
    path: '',
    component: ListDialogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDialogsPageRoutingModule {}
