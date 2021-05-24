import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { ImgJugadorPipe } from "src/app/pipes/img-jugador.pipe";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule,
       TranslateModule.forChild({
          loader: {
           provide: TranslateLoader,
            useFactory: createTranslateLoader,
           deps: [HttpClient]
         }
       })],
  
  
  declarations: [HomePage]
})
export class HomePageModule {}
