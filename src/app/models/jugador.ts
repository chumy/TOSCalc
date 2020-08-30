export class Jugador {
  nombre: string;
  id: number;
  mazo: string;
  sueldo: number;
  precio: number;
  pase: number;
  tiro: number;
  centrarIzq: number;
  centrarDcha: number;
  defensaIzq: number;
  defensaDcha: number;
  entradas: number;
  habArriba: string;
  habDerecha: string;
  habIzquierda: string;
  habAbajo: string;
  PORTERO: number;
  LATERAL_IZQUIERDO: number;
  DEFENSA_IZQUIERDO: number;
  DEFENSA_DERECHO: number;
  LATERAL_DERECHO: number;
  EXTREMO_IZQUIERDO: number;
  CENTRO_IZQUIERDO: number;
  CENTRO_DERECHO: number;
  EXTREMO_DERECHO: number;
  DELANTERO_IZQUIERDO: number;
  DELANTERO_DERECHO: number;

  constructor() {
    this.nombre = null;
    this.id = null;
    this.mazo = "";
    this.sueldo = 0;
    this.precio = 0;
    this.pase = 0;
    this.tiro = 0;
    this.centrarIzq = 0;
    this.centrarDcha = 0;
    this.defensaIzq = 0;
    this.defensaDcha = 0;
    this.entradas = 0;
    this.habArriba = "";
    this.habDerecha = "";
    this.habIzquierda = "";
    this.habAbajo = "";
    this.PORTERO = 0;
    this.LATERAL_IZQUIERDO = 0;
    this.DEFENSA_IZQUIERDO = 0;
    this.DEFENSA_DERECHO = 0;
    this.LATERAL_DERECHO = 0;
    this.EXTREMO_IZQUIERDO = 0;
    this.CENTRO_IZQUIERDO = 0;
    this.CENTRO_DERECHO = 0;
    this.EXTREMO_DERECHO = 0;
    this.DELANTERO_IZQUIERDO = 0;
    this.DELANTERO_DERECHO = 0;
  }
}
