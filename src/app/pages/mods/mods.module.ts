import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModsPageRoutingModule } from './mods-routing.module';

import { ModsPage } from './mods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModsPageRoutingModule
  ],
  declarations: [ModsPage]
})
export class ModsPageModule {}
