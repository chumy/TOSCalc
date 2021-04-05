import { Jugador } from "./jugador";
import { Entrenador } from "./entrenador";
import { Empleado } from "./empleado";
import { Patrocinador } from "./patrocinador";

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
  BENCH1: Entrenador;
  BENCH2: Entrenador;
  BENCH3: Entrenador;
  BENCH4: Entrenador;
  BENCH5: Entrenador;
  AFICION: number;
  OJEADOR: Empleado;
  AGENTE: Empleado;
  CM: Empleado;
  TV: Patrocinador;
  VALLA: Patrocinador;
  mod: String; //Fichero de datos


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
    this.GANANCIAS = -9;
    this.DEFENSA = -10;
    this.ATAQUE = -12;
    this.COACH1 = new Entrenador();
    this.COACH2 = new Entrenador();
    this.COACH3 = new Entrenador();
    this.BENCH1 = new Entrenador();
    this.BENCH2 = new Entrenador();
    this.BENCH2 = new Entrenador();
    this.BENCH3 = new Entrenador();
    this.BENCH4 = new Entrenador();
    this.BENCH5 = new Entrenador();
    this.AFICION = 13;
    this.OJEADOR = new Empleado();
    this.AGENTE = new Empleado();
    this.CM = new Empleado();
    this.VALLA = new Patrocinador();
    this.TV = new Patrocinador();
    this.mod = "TOS"
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
