import { Jugador } from "./jugador";
import { Entrenador } from "./entrenador";

export class Alineacion {
  DELANTERO_IZQUIERDO: Jugador;
  DELANTERO_DERECHO: Jugador;
  EXTREMO_DERECHO: Jugador;
  CENTRO_DERECHO: Jugador;
  CENTRO_IZQUIERDO: Jugador;
  EXTREMO_IZQUIERDO: Jugador;
  LATERAL_DERECHO: Jugador;
  DEFENSA_DERECHO: Jugador;
  DEFENSA_IZQUIERDO: Jugador;
  LATERAL_IZQUIERDO: Jugador;
  PORTERO: Jugador;
  GANANCIAS: number;
  ATAQUE: number;
  DEFENSA: number;
  COACH1: Entrenador;
  COACH2: Entrenador;
  COACH3: Entrenador;

  constructor() {
    this.DELANTERO_IZQUIERDO = new Jugador();
    this.DELANTERO_DERECHO = new Jugador();
    this.EXTREMO_DERECHO = new Jugador();
    this.CENTRO_DERECHO = new Jugador();
    this.CENTRO_IZQUIERDO = new Jugador();
    this.EXTREMO_IZQUIERDO = new Jugador();
    this.LATERAL_DERECHO = new Jugador();
    this.DEFENSA_DERECHO = new Jugador();
    this.DEFENSA_IZQUIERDO = new Jugador();
    this.LATERAL_IZQUIERDO = new Jugador();
    this.PORTERO = new Jugador();
    this.GANANCIAS = 0;
    this.DEFENSA = -10;
    this.ATAQUE = -12;
    this.COACH1 = new Entrenador();
    this.COACH2 = new Entrenador();
    this.COACH3 = new Entrenador();
  }

  getEntrenador(id: string): Entrenador {
    switch (id) {
      case "COACH1":
        return this.COACH1;
      case "COACH2":
        return this.COACH2;
      case "COACH3":
        return this.COACH3;
    }
  }
}
