import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWorkspacePage } from './edit-workspace.page';

const routes: Routes = [
  {
    path: '',
    component: EditWorkspacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWorkspacePageRoutingModule {}
