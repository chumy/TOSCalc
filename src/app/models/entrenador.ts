export class Entrenador {
  nombre: string;
  id: number;
  mazo: string;
  sueldo: number;
  precio: number;
  TIRO: number;
  ENTRADAS: number;
  PASE: number;
  EQUIPO: number;
  CENTRO: number;
  posAtaque: string;
  posDefensa: string;
  isEntrenador: boolean;

  constructor() {
    this.nombre = "";
    this.id = null;
    this.mazo = "";
    this.sueldo = 0;
    this.precio = 0;
    this.PASE = 0;
    this.TIRO = 0;
    this.ENTRADAS = 0;
    this.EQUIPO = 0;
    this.CENTRO = 0;
    this.posAtaque = "NONE";
    this.posDefensa = "NONE"
    this.isEntrenador = true;
  }

  getModificadoresHabilidad() {
    let modificadores: string[] = [];

    if (this.CENTRO > 0) modificadores.push("CENTRO");
    if (this.PASE > 0) modificadores.push("PASE");
    if (this.TIRO > 0) modificadores.push("TIRO");
    if (this.ENTRADAS > 0) modificadores.push("ENTRADAS");
    if (this.EQUIPO > 0) modificadores.push("EQUIPO");

    return modificadores;
  }
}
