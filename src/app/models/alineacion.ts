import { Jugador } from "./jugador";
import { Entrenador } from "./entrenador";

export class Alineacion {
  DELANTERO_IZQUIERDO: Jugador;
  DELANTERO_DERECHO: Jugador;
  EXTREMO_DERECHA: Jugador;
  CENTRO_DERECHA: Jugador;
  CENTRO_IZQUIERDA: Jugador;
  EXTREMO_IZQUIERDA: Jugador;
  LATERAL_DERECHO: Jugador;
  DEFENSA_DERECHO: Jugador;
  DEFENSA_IZQUIERDO: Jugador;
  LATERAL_IZQUIERDA: Jugador;
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
    this.EXTREMO_DERECHA = new Jugador();
    this.CENTRO_DERECHA = new Jugador();
    this.CENTRO_IZQUIERDA = new Jugador();
    this.EXTREMO_IZQUIERDA = new Jugador();
    this.LATERAL_DERECHO = new Jugador();
    this.DEFENSA_DERECHO = new Jugador();
    this.DEFENSA_IZQUIERDO = new Jugador();
    this.LATERAL_IZQUIERDA = new Jugador();
    this.PORTERO = new Jugador();
    this.GANANCIAS = 0;
    this.DEFENSA = 0;
    this.ATAQUE = 0;
    this.COACH1 = new Entrenador();
    this.COACH2 = new Entrenador();
    this.COACH3 = new Entrenador();
  }
}
