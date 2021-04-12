import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alineacion } from 'src/app/models/alineacion';
import { Empleado } from 'src/app/models/empleado';
import { AlineacionService } from 'src/app/services/alineacion.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: Empleado[];
  posicion: string;
  alineacion: Alineacion;


  constructor(
    private _empleadoService: EmpleadosService,
    private _alineacionService: AlineacionService,
    private activatedroute: ActivatedRoute,
    public router: Router
  ) { 

    
    
    
  }

  async ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const newLocal = "posicion";
      
      this.posicion = paramMap.get(newLocal);
      this.alineacion = this._alineacionService.alineacion;
      
      this.empleados = this._empleadoService.empleados.filter(data => {
        return data[this.posicion] == 1;
      });
      
    });
  }

  public empleadoSeleccionado(id: string, posicion: string) {
    let empleado = this.empleados.filter(data => {
      return data["id"] == parseInt(id);
    });
    this._alineacionService.guardarEmpleadoPosicion(
      empleado[0],
      posicion
    );

    this.router.navigateByUrl("/home");
  }

  removeEmpleado(posicion: string) {
    this._alineacionService.eliminarEmpleado(posicion);

    this.router.navigateByUrl("/home");
  }

}



