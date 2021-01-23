import { Injectable, ɵConsole } from "@angular/core";
import { Jugador } from "../models/jugador";
import { Alineacion } from "../models/alineacion";
import { Entrenador } from "../models/entrenador";

@Injectable({
  providedIn: "root"
})
export class AlineacionService {
  alineacion: Alineacion;

  private posicionesAtaque: string[] = [
    "DELANTERO_IZQUIERDO",
    "DELANTERO_DERECHO",
    "EXTREMO_DERECHO",
    "CENTRO_DERECHO",
    "CENTRO_IZQUIERDO",
    "EXTREMO_IZQUIERDO"
  ];
  private posicionesDefensa: string[] = [
    "DEFENSA_DERECHO",
    "DEFENSA_IZQUIERDO",
    "LATERAL_DERECHO",
    "LATERAL_IZQUIERDO",
    "PORTERO"
  ];

  private posicionesAtaqueIniciales: string[] = [
    "DELANTERO_IZQUIERDO",
    "DELANTERO_DERECHO",
    "EXTREMO_DERECHO",
    "CENTRO_DERECHO",
    "CENTRO_IZQUIERDO",
    "EXTREMO_IZQUIERDO"
  ];
  private posicionesDefensaIniciales: string[] = [
    "DEFENSA_DERECHO",
    "DEFENSA_IZQUIERDO",
    "LATERAL_DERECHO",
    "LATERAL_IZQUIERDO",
    "PORTERO"
  ];

  constructor() {
    this.alineacion = new Alineacion();
    //this.cargarAlineacion();
  }

  cargarAlineacion() {
    if (localStorage.getItem("alineacion")) {
      this.alineacion = JSON.parse(localStorage.getItem("alineacion"));
    } else {
      this.alineacion = new Alineacion();
    }
  }

  guardarAlineacion() {
    this.actualizarValores();
    //localStorage.setItem("alineacion", JSON.stringify(this.alineacion));
  }

  guardarJugadorPosicion(jugador: Jugador, posicion: string) {
    //Chequear que no exista previamente
    this.eliminarJugador(jugador);

    this.alineacion[posicion] = jugador;
    this.guardarAlineacion();
  }

  guardarEntrenadorPosicion(entrenador: Entrenador, posicion: string) {
    //Chequear que no exista previamente
    this.eliminarEntrenador(entrenador);

    this.alineacion[posicion] = entrenador;
    this.guardarAlineacion();
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
      }
    });
  }

  actualizarDefensa() {
    let defensa = 0;
    let posiciones: string[];
    //Obtener posiciones de Ataque
    posiciones = this.getPosicionesDefensa();

    Object.keys(this.alineacion).forEach(key => {
      if (typeof this.alineacion[key] == "object") {
        //Si es Jugador

        if (posiciones.includes(key)) {
          //Si esta vacio

          if (this.alineacion[key].id === null) {
            defensa = defensa - 2;
          } else {
            defensa += this.calculoPosicion(
              key,
              this.alineacion[key],
              "DEFENSA"
            );
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
    this.actualizarValores();
  }

  eliminarEntrenador(entrenador: Entrenador) {
    Object.keys(this.alineacion).forEach(key => {
      if (
        typeof this.alineacion[key] == "object" &&
        this.alineacion[key].id === entrenador.id
      ) {
        this.alineacion[key] = new Entrenador();
        
        if (key === "COACH1") {

          if (this.alineacion["COACH2"].id != null) {
            this.alineacion[key] = this.alineacion["COACH2"];
            this.alineacion["COACH2"] = new Entrenador();
          }
          else if (this.alineacion["COACH3"].id != null) {
            this.alineacion[key] = this.alineacion["COACH3"];
            this.alineacion["COACH3"] = new Entrenador();
          } else {
            // Restore initial positions
            this.posicionesAtaque = this.posicionesAtaqueIniciales;
            this.posicionesDefensa = this.posicionesDefensaIniciales;
          }
        }
      }
    });

    this.actualizarValores();
  }

   eliminarBanquillo(posicion) {
    
    this.alineacion[posicion] = new Entrenador();
    this.actualizarValores();
  }

  calculoPosicion(posicion: string, jugador: Jugador, tipo: string): number {
    let puntos: number = 0;
    let aux: any;

    switch (posicion) {
      case "DELANTERO_IZQUIERDO":
        aux = jugador.tiro;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (jugador.habArriba === "TIRO") puntos += 2;
        if (
          this.alineacion["EXTREMO_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda === "CENTRO"
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
        if (jugador.habArriba === "TIRO") puntos += 2;
        if (
          this.alineacion["EXTREMO_DERECHO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha === "CENTRO"
        )
          puntos += 3;
        if (
          this.alineacion["DELANTERO_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;

        break;

      case "EXTREMO_IZQUIERDO":
        aux = tipo === "ATAQUE" ? jugador.centrarIzq : jugador.defensaIzq;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["LATERAL_IZQUIERDO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo === "PASE"
        )
          puntos += 3;
        if (
          this.alineacion["CENTRO_IZQUIERDO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DELANTERO_IZQUIERDO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha === "CENTRO"
        )
          puntos += 3;
        break;

      case "CENTRO_IZQUIERDO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["EXTREMO_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["CENTRO_DERECHO"].habIzquierda ===
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
      case "CENTRO_DERECHO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["DEFENSA_DERECHO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["EXTREMO_DERECHO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["CENTRO_IZQUIERDO"].habDerecha ===
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
      case "EXTREMO_DERECHO":
        aux = tipo === "ATAQUE" ? jugador.centrarDcha : jugador.defensaDcha;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["LATERAL_DERECHO"].habArriba === jugador.habAbajo &&
          jugador.habAbajo === "PASE"
        )
          puntos += 3;
        if (
          this.alineacion["CENTRO_DERECHO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (
          this.alineacion["DELANTERO_DERECHO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda === "CENTRO"
        )
          puntos += 3;
        break;
      case "LATERAL_IZQUIERDO":
        aux = tipo === "ATAQUE" ? jugador.centrarIzq : jugador.defensaIzq;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["EXTREMO_IZQUIERDO"].habAbajo === jugador.habArriba &&
          jugador.habArriba === "PASE"
        )
          puntos += 3;
        if (
          this.alineacion["DEFENSA_IZQUIERDO"].habIzquierda ===
            jugador.habDerecha &&
          jugador.habDerecha !== "NONE"
        )
          puntos += 1;
        if (jugador.habIzquierda === "ENTRADAS") puntos += 2;
        break;
      case "DEFENSA_IZQUIERDO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_IZQUIERDO"].habAbajo === jugador.habArriba &&
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
          this.alineacion["LATERAL_IZQUIERDO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (jugador.habAbajo === "ENTRADAS") puntos += 2;
        break;
      case "DEFENSA_DERECHO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_DERECHO"].habAbajo === jugador.habArriba &&
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
        if (jugador.habAbajo === "ENTRADAS") puntos += 2;
        break;
      case "LATERAL_DERECHO":
        aux = tipo === "ATAQUE" ? jugador.centrarDcha : jugador.defensaDcha;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["EXTREMO_DERECHO"].habAbajo === jugador.habArriba &&
          jugador.habArriba === "PASE"
        )
          puntos += 3;
        if (
          this.alineacion["DEFENSA_DERECHO"].habDerecha ===
            jugador.habIzquierda &&
          jugador.habIzquierda !== "NONE"
        )
          puntos += 1;
        if (jugador.habDerecha === "ENTRADAS") puntos += 2;
        break;
      case "DEFENSA_DERECHO":
        aux = tipo === "ATAQUE" ? jugador.pase : jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        if (
          this.alineacion["CENTRO_DERECHO"].habAbajo === jugador.habArriba &&
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
        if (jugador.habAbajo === "ENTRADAS") puntos += 2;
        break;
      case "PORTERO":
        //debugger;
        aux = jugador.entradas;
        if (parseInt(aux) > 0) puntos = parseInt(aux);
        break;
      default:
        puntos = 0;
    }
    // Anadir puntos extra por entrenador
    puntos += this.getPuntosHabilidad(jugador);

    return puntos;
  }

  getPosicionesAtaque(): string[] {
    let calculatedPositionsAtaque: string[] = [...this.posicionesAtaque];
    if (this.alineacion["COACH1"].posAtaque !== "NONE")
      calculatedPositionsAtaque.push(this.alineacion["COACH1"].posAtaque);
    if (this.alineacion["COACH1"].posDefensa !== "NONE")
      calculatedPositionsAtaque = calculatedPositionsAtaque.map(data => {
        if (data !== this.alineacion["COACH1"].posDefensa) return data;
      });
    return calculatedPositionsAtaque;
  }

  getPosicionesDefensa(): string[] {
    let calculatedPositionsDefensa: string[] = [...this.posicionesDefensa];
    if (this.alineacion["COACH1"].posDefensa !== "NONE")
      calculatedPositionsDefensa.push(this.alineacion["COACH1"].posDefensa);
    if (this.alineacion["COACH1"].posAtaque !== "NONE")
      calculatedPositionsDefensa = calculatedPositionsDefensa.map(data => {
        if (data !== this.alineacion["COACH1"].posAtaque) return data;
      });

    return calculatedPositionsDefensa;
  }

  getPuntosHabilidad(jugador) {
    let puntos: number = 0;
    let listaEntrenadores = ["COACH1", "COACH2", "COACH3"];

    listaEntrenadores.forEach(nombre => {
      if (this.alineacion[nombre].id) {
        let entrenador: Entrenador = this.alineacion.getEntrenador(nombre);
        let habilidadesJugador = jugador.getHabilidades();

        let matches = entrenador.getModificadoresHabilidad().filter(data => {
          return habilidadesJugador.includes(data);
        });

        matches.forEach(element => {
          if (parseInt(entrenador[element]) > 0)
            puntos += parseInt(entrenador[element]);
        });
      }
    });

    return puntos;
  }



  getFreeBench() {

    let listaBanquillos = ["BENCH1", "BENCH2", "BENCH3", "BENCH4", "BENCH5"];
    let freeBench : string = "BENCH5";
    var keepGoing = true;

    listaBanquillos.forEach(posicion => {
      if (keepGoing) {
        if (this.alineacion[posicion].id == null) {
          freeBench = posicion;
          keepGoing = false;
        }
      }
    });
    
    return freeBench;
    
  }
    enviarEntrenadorBanquillo(entrenador) {
    let posicion = this.getFreeBench();
      this.alineacion[posicion] = entrenador;
      this.actualizarGanancias();
    }
  
  enviarJugadorBanquillo(jugador) {
    let posicion = this.getFreeBench();
    this.alineacion[posicion] = jugador;
    this.actualizarGanancias();
    }
  
}
