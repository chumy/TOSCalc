import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JugadoresService } from "../../services/jugadores.service";

import { AlineacionService } from "src/app/services/alineacion.service";
import { Jugador } from "src/app/models/jugador";
import { Alineacion } from "src/app/models/alineacion";





@Component({
  selector: "app-jugadores",
  templateUrl: "./jugadores.page.html",
  styleUrls: ["./jugadores.page.scss"],
})
  
export class JugadoresPage implements OnInit {
  jugadores: Jugador[];
  posicion: string;
  alineacion: Alineacion;

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

      this.alineacion = this._alineacionService.alineacion;
      this.jugadores = this._jugadoresService.jugadores.filter(data => {
        return data[this.posicion] == 1;
      });
    });

   

  }

  jugadorSeleccionado(id: string) {
    let jugador = this.jugadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.guardarJugadorPosicion(jugador[0], this.posicion);
    //console.log(this.alineacion);
    this.router.navigateByUrl("/home");
  }

  removeJugador(id: string) {
    let jugador = this.jugadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.eliminarJugador(jugador[0]);

    this.router.navigateByUrl("/home");
  }

  sendBanquillo(id: string) {
    let jugador = this.jugadores.filter(data => {
      return data["id"] == parseInt(id);
    });
    
    this.removeJugador(id);
    this._alineacionService.enviarJugadorBanquillo(jugador[0]);

    this.router.navigateByUrl("/home");
  }

  sort(term: string) {
    
    if (term == 'id')
    {
      this.jugadores.sort((a, b) => ( ('00' + a[term]).slice(-2) > ('00' + b[term]).slice(-2) ) ? 1 : (('00' + b[term]).slice(-2)   > ('00' + a[term]).slice(-2) ) ? -1 : 0);
    }
    else
      this.jugadores.sort((a, b) => (a[term] > b[term] ) ? 1 : (b[term]  > a[term] ) ? -1 : 0);
    //console.log(this.jugadores);
  }

}
