import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanquilloPageRoutingModule } from './banquillo-routing.module';

import { BanquilloPage } from './banquillo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanquilloPageRoutingModule
  ],
  declarations: [BanquilloPage]
})
export class BanquilloPageModule {}
