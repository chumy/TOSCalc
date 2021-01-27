export class Empleado {

  nombre: string;
  id: number;
  mazo: string;
  sueldo: number;
  tipo: string;
  OJEADOR: number;
  AGENTE: number;
  CM: number;


  constructor() {
    this.nombre = "";
    this.id = null;
    this.mazo = "";
    this.sueldo = 0;
    this.OJEADOR = 0;
    this.AGENTE = 0;
    this.CM = 0;
  }

}