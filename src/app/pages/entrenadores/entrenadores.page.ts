import { Component, OnInit } from "@angular/core";
import { Entrenador } from "src/app/models/entrenador";
import { EntrenadoresService } from "src/app/services/entrenadores.service";
import { AlineacionService } from "src/app/services/alineacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Alineacion } from "src/app/models/alineacion";

@Component({
  selector: "app-entrenadores",
  templateUrl: "./entrenadores.page.html",
  styleUrls: ["./entrenadores.page.scss"]
})
export class EntrenadoresPage implements OnInit {
  entrenadores: Entrenador[];
  posicion: string;
  alineacion: Alineacion;

  constructor(
    private _entrenadoresService: EntrenadoresService,
    private _alineacionService: AlineacionService,
    private activatedroute: ActivatedRoute,
    public router: Router
  ) {}

  async ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const newLocal = "posicion";
      this.posicion = paramMap.get(newLocal);

      //console.log("recibida posicion ", this.posicion);
      this.entrenadores = this._entrenadoresService.entrenadores;
      this.alineacion = this._alineacionService.alineacion;
      // console.log(this.entrenadores);
    });
  }

  entrenadorSeleccionado(id: string) {
    //console.log("recibida posicion ", id, " - ", this.posicion);
    let entrenador = this.entrenadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.guardarEntrenadorPosicion(
      entrenador[0],
      this.posicion
    );
    //console.log("seleccionado ", jugador);
    //this._alineacionService.actualizarValores();
    this.router.navigateByUrl("/home");
  }

  removeJugador(id: string) {
    let entrenador = this.entrenadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.eliminarEntrenador(entrenador[0]);
    //console.log("seleccionado ", jugador);
    //this._alineacionService.actualizarValores();
    this.router.navigateByUrl("/home");
  }
}
