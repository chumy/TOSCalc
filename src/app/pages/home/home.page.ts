import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { JugadoresPage } from "../jugadores/jugadores.page";
import { AlineacionService } from "src/app/services/alineacion.service";
import { JugadoresService } from "src/app/services/jugadores.service";
import { Jugador } from "src/app/models/jugador";
import { Entrenador } from "src/app/models/entrenador";
import { EntrenadoresService } from "src/app/services/entrenadores.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  alineacion: any;
  jugadoresPage: any;
  jugadores: Jugador[];
  entrenadores: Entrenador[];
  isData: boolean = false;

  constructor(
    private _alineacionService: AlineacionService,
    private _jugadorService: JugadoresService,
    private _entreandorService: EntrenadoresService,
    public navCtrl: NavController
  ) {
    this.alineacion = _alineacionService.alineacion;
    this.jugadoresPage = JugadoresPage;
    this.entrenadores = _entreandorService.entrenadores;
    this.jugadores = _jugadorService.jugadores;
  }

  async ngOnInit() {
    this.alineacion = this._alineacionService.alineacion;

    this.isData = true;
  }

  public getImgJugador(posicion: string): string {
    return this.alineacion[posicion].id
      ? "assets/images/jugadores/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/jugador_vacio.jpg";
  }

  public getImgEntrenador(posicion: string): string {
    return this.alineacion[posicion].id
      ? "assets/images/entrenadores/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/entrenadores/entrenador_vacio.jpg";
  }
}
