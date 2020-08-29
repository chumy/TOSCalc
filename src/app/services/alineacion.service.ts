import { Injectable } from "@angular/core";
import { Jugador } from "../models/jugador";
import { Alineacion } from "../models/alineacion";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class AlineacionService {
  alineacion: Alineacion;

  private posicionesAtaque: string[] = [
    "DELANTERO_IZQUIERDO",
    "DELANTERO_DERECHO",
    "EXTREMO_DERECHA",
    "CENTRO_DERECHA",
    "CENTRO_IZQUIERDA",
    "EXTREMO_IZQUIERDA"
  ];
  private posicionesDefensa: string[] = [
    "LATERAL_DERECHO",
    "DEFENSA_DERECHO",
    "DEFENSA_IZQUIERDO",
    "LATERAL_IZQUIERDA",
    "PORTERO"
  ];

  constructor() {
    //this.alineacion = new Alineacion();
    this.cargarAlineacion();
  }

  cargarAlineacion() {
    if (localStorage.getItem("alineacion")) {
      this.alineacion = JSON.parse(localStorage.getItem("alineacion"));
    } else {
      this.alineacion = new Alineacion();
    }
  }

  guardarJugadorPosicion(jugador: Jugador, posicion: string) {
    //Chequear que no exista previamente
    this.eliminarJugador(jugador);

    this.alineacion[posicion] = jugador;
    this.guardarAlineacion();
  }

  guardarAlineacion() {
    this.actualizarValores();
    localStorage.setItem("alineacion", JSON.stringify(this.alineacion));
  }

  actualizarValores() {
    this.actualizarGanancias();
    this.actualizarAtaque();
    this.actualizarDefensa();
  }

  actualizarGanancias() {
    this.alineacion.GANANCIAS = 0;
    Object.keys(this.alineacion).forEach(key => {
      if (typeof this.alineacion[key] == "object") {
        this.alineacion.GANANCIAS += parseInt(this.alineacion[key].sueldo);
        //console.log(parseInt(this.alineacion[key].sueldo));
      }
    });
  }

  actualizarDefensa() {
    let defensa = 0;
    Object.keys(this.alineacion).forEach(key => {
      if (typeof this.alineacion[key] == "object") {
        //Si es Jugador
        if (this.posicionesDefensa.includes(key)) {
          //Si esta vacio
          if (this.alineacion[key].id === null) {
            defensa = defensa - 2;
          } else {
            defensa = defensa;
          }
        }
      }
    });
    this.alineacion.DEFENSA = defensa;
  }

  actualizarAtaque() {
    let ataque: number = 0;
    let posiciones: string[];
    Object.keys(this.alineacion).forEach(key => {
      if (typeof this.alineacion[key] == "object") {
        //Si es Jugador
        //Obtener posiciones de Ataque
        posiciones = this.getPosicionesAtaque();
        if (posiciones.includes(key)) {
          //Si esta vacio
          if (this.alineacion[key].id === null) {
            ataque = ataque - 2;
          } else {
            //debugger;
            ataque += this.calculoPosicion(key, this.alineacion[key], "ATAQUE");
          }
        }
      }
    });
    this.alineacion.ATAQUE = ataque;
  }

  eliminarJugador(jugador: Jugador) {
    Object.keys(this.alineacion).forEach(key => {
      if (
        typeof this.alineacion[key] == "object" &&
        this.alineacion[key].id === jugador.id
      ) {
        this.alineacion[key] = new Jugador();
      }
    });
  }

  calculoPosicion(posicion: string, jugador: Jugador, tipo: string): number {
    let puntos: number = 0;
    let aux: any;
    //console.log(jugador);
    switch (posicion) {
      case "DELANTERO_IZQUIERDO":
        //debugger;
        aux = jugador.tiro;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (jugador.habArriba === "SHOT") puntos += 2;
        if (
          this.alineacion["EXTREMO_IZQUIERDA"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda === "CROSS"
        )
          puntos += 3;
        if (
          this.alineacion["DELANTERO_DERECHO"].habIzquierda ===
          jugador.habDerecha
        )
          puntos += 1;
        break;
      case "DELANTERO_DERECHO":
        aux = jugador.tiro;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (jugador.habArriba === "SHOT") puntos += 2;
        if (
          this.alineacion["EXTREMO_DERECHA"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha === "CROSS"
        )
          puntos += 3;
        if (
          this.alineacion["DELANTERO_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;

        break;

      case "EXTREMO_IZQUIERDA":
        //debugger;
        aux = tipo === "ATAQUE" ? jugador.centrarIzq : jugador.defensaIzq;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["LATERAL_IZQUIERDA"].habArriba === jugador.habAbajo &&
          jugador.habAbajo === "PASS"
        )
          puntos += 3;
        if (
          this.alineacion["CENTRO_IZQUIERDA"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DELANTERO_IZQUIERDO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha === "CROSS"
        )
          puntos += 3;
        break;

      case "CENTRO_IZQUIERDA":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["EXTREMO_IZQUIERDA"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["CENTRO_DERECHA"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;

        if (
          this.alineacion["DELANTERO_IZQUIERDO"].habAbajo ===
            jugador.habArriba &&
          jugador.habArriba !== "NONE"
        )
          puntos += 3;
        break;
      case "CENTRO_DERECHA":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["DEFENSA_DERECHO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["EXTREMO_DERECHA"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["CENTRO_IZQUIERDA"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;

        if (
          this.alineacion["DELANTERO_DERECHO"].habAbajo === jugador.habArriba &&
          jugador.habArriba !== "NONE"
        )
          puntos += 3;
        break;
      case "EXTREMO_DERECHA":
        //debugger;
        aux = tipo === "ATAQUE" ? jugador.centrarDcha : jugador.defensaDcha;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["LATERAL_DERECHO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo === "PASS"
        )
          puntos += 3;
        if (
          this.alineacion["CENTRO_DERECHA"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DELANTERO_DERECHO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda === "CROSS"
        )
          puntos += 3;
        break;
      case "LATERAL_IZQUIERDA":
        //debugger;
        aux = tipo === "ATAQUE" ? jugador.centrarIzq : jugador.defensaIzq;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["EXTREMO_IZQUIERDA"].habAbajo === jugador.habArriba &&
          jugador.habArriba === "PASS"
        )
          puntos += 3;
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (jugador.habIzquierda === "TACKLE") puntos += 2;
        break;
      case "DEFENSA_IZQUIERDO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_IZQUIERDA"].habAbajo === jugador.habArriba &&
          jugador.habArriba !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DEFENSA_DERECHO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["LATERAL_IZQUIERDA"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (jugador.habAbajo === "TACKLE") puntos += 2;
        break;
      case "DEFENSA_DERECHO":
        //debugger;

        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_DERECHA"].habAbajo === jugador.habArriba &&
          jugador.habArriba !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["LATERAL_DERECHO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (jugador.habAbajo === "TACKLE") puntos += 2;
        break;
      case "LATERAL_DERECHO":
        //debugger;
        aux = tipo === "ATAQUE" ? jugador.centrarDcha : jugador.defensaDcha;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["EXTREMO_DERECHA"].habAbajo === jugador.habArriba &&
          jugador.habArriba === "PASS"
        )
          puntos += 3;
        if (
          this.alineacion["DEFENSA_DERECHO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (jugador.habDerecha === "TACKLE") puntos += 2;
        break;
      case "DEFENSA_DERECHO":
        //debugger;

        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_DERECHA"].habAbajo === jugador.habArriba &&
          jugador.habArriba !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["LATERAL_DERECHO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (jugador.habAbajo === "TACKLE") puntos += 2;
        break;
      case "PORTERO":
        //debugger;
        aux = jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        break;
      default:
        puntos = 0;
    }
    console.log(posicion, " - ", puntos);
    return puntos;
  }

  getPosicionesAtaque(): string[] {
    return this.posicionesAtaque;
  }
}
