import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@capacitor/splash-screen";
//import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HomePage } from "./pages/home/home.page";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  rootPage: any = HomePage;
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    public translateService: TranslateService 
  ) {
    
    // Idioma
    this.translateService.setDefaultLang('es');
    this.translateService.use('es'); 
      
    platform.ready().then(() => {
      //statusBar.styleDefault();
      //
      SplashScreen.hide();
    });

  }
}
