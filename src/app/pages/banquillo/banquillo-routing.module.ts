import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanquilloPage } from './banquillo.page';

const routes: Routes = [
  {
    path: '',
    component: BanquilloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanquilloPageRoutingModule {}
