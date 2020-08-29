import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JugadoresService } from "../../services/jugadores.service";

import { AlineacionService } from "src/app/services/alineacion.service";
import { Jugador } from "src/app/models/jugador";

@Component({
  selector: "app-jugadores",
  templateUrl: "./jugadores.page.html",
  styleUrls: ["./jugadores.page.scss"]
})
export class JugadoresPage implements OnInit {
  jugadores: Jugador[];
  posicion: string;

  constructor(
    private _jugadoresService: JugadoresService,
    private activatedroute: ActivatedRoute,
    private _alineacionService: AlineacionService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const newLocal = "posicion";
      this.posicion = paramMap.get(newLocal);

      console.log("recibida posicion ", this.posicion);

      /* this._jugadoresService.getJugadores().subscribe(valor => {
        this.jugadores = valor.filter(data => {
          return data[this.posicion] == 1;
        });
        console.log(this.jugadores);
      });
      */

      this.jugadores = this._jugadoresService.jugadores.filter(data => {
        return data[this.posicion] == 1;
      });
      //console.log(this.jugadores);
    });
    //console.log("recibida posicion ", this.posicion);
  }

  jugadorSeleccionado(id: string) {
    //console.log("recibida posicion ", id, " - ", this.posicion);
    let jugador = this.jugadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.guardarJugadorPosicion(jugador[0], this.posicion);
    //console.log("seleccionado ", jugador);
    //this._alineacionService.actualizarValores();
    this.router.navigateByUrl("/home");
  }
}
