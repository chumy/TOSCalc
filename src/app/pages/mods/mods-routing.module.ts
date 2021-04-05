import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModsPage } from './mods.page';

const routes: Routes = [
  {
    path: '',
    component: ModsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModsPageRoutingModule {}
