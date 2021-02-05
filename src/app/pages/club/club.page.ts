import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alineacion } from 'src/app/models/alineacion';
import { Empleado } from 'src/app/models/empleado';
import { Patrocinador } from 'src/app/models/patrocinador';
import { AlineacionService } from 'src/app/services/alineacion.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  posicion: string;
  alineacion: Alineacion;
  empleados: Empleado[];
  patrocinadores: Patrocinador[];

  constructor(
    private _alineacionService: AlineacionService,
    private _empleadoService: EmpleadosService,
    private _patrocinadorService : PatrocinadoresService,

  ) {
    this.empleados = _empleadoService.empleados;
  }

  async ngOnInit() {
    
    this.empleados = this._empleadoService.empleados;
    this.patrocinadores = this._patrocinadorService.patrocinadores;
    this.alineacion = this._alineacionService.alineacion;
    
  }

  public getImgPatrocinador(posicion: string): string {
     
     return this.alineacion[posicion].id
      ? "assets/images/patrocinadores/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/patrocinadores/"+ posicion + "_vacio.jpg";
  }
  
  
  public getImgEmpleado(posicion: string): string{
    return this.alineacion[posicion].id
      ? "assets/images/empleados/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/empleados/" + posicion + "_vacio.jpg";
  }
     
  
  public updateAficion() {
    this._alineacionService.actualizarGanancias();
  }
}
