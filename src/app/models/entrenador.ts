export class Entrenador {
  nombre: string;
  id: number;
  mazo: string;
  sueldo: number;
  precio: number;
  tiro: number;
  entradas: number;
  pase: number;
  equipo: number;
  centro: number;
  posAtaque: string;
  posDefensa: string;

  constructor() {
    this.nombre = "";
    this.id = null;
    this.mazo = "";
    this.sueldo = 0;
    this.precio = 0;
    this.pase = 0;
    this.tiro = 0;
    this.entradas = 0;
    this.equipo = 0;
    this.posAtaque = "";
    this.posDefensa = "";
  }
}
