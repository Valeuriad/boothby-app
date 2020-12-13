import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'my-workspace',
    loadChildren: () =>
      import('./pages/edit-workspace/edit-workspace.module').then(
        (m) => m.EditWorkspacePageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'dialogs',
    loadChildren: () =>
      import('./pages/dialogs/list-dialogs/list-dialogs.module').then(
        (m) => m.ListDialogsPageModule
      ),
  },
  {
    path: 'dialogs/:id',
    loadChildren: () =>
      import('./pages/dialogs/edit-dialog/edit-dialog.module').then(
        (m) => m.EditDialogPageModule
      ),
  },
  {
    path: 'dialogs/:id/lines',
    loadChildren: () =>
      import('./pages/dialogs/edit-dialog-lines/edit-dialog-lines.module').then(
        (m) => m.EditDialogLinesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
