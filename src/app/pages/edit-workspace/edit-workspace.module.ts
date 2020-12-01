import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWorkspacePageRoutingModule } from './edit-workspace-routing.module';

import { EditWorkspacePage } from './edit-workspace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWorkspacePageRoutingModule
  ],
  declarations: [EditWorkspacePage]
})
export class EditWorkspacePageModule {}
