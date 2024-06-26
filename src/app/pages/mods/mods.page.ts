import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alineacion } from 'src/app/models/alineacion';
import { Empleado } from 'src/app/models/empleado';
import { Patrocinador } from 'src/app/models/patrocinador';
import { AlineacionService } from 'src/app/services/alineacion.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores.service';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.page.html',
  styleUrls: ['./mods.page.scss'],
})
export class ModsPage implements OnInit {


  alineacion: Alineacion;

  ficheros: any[];

  constructor(
    private _alineacionService: AlineacionService,
    private _jugadorService: JugadoresService,
private router: Router

  ) {
    this.ficheros = [{
      name: "Original",
      file: "TOS"
    },
      {
      name: "Campeones",
      file: "Campeones"
    },
  ]

  }

  async ngOnInit() {
    

    this.alineacion = this._alineacionService.alineacion;
    
    
  }

  public changeFile(fichero: string) {
    this._jugadorService.setNewFile(fichero);
    this._alineacionService.emptyAlineacion();
    //this._alineacionService.actualizarValores();
    this._alineacionService.setMod(fichero);
    //this._jugadorService.setNewFile(this.alineacion.mod);
    //console.log(this._alineacionService.alineacion);
    this.router.navigateByUrl("/home");
    
    
  }

 

}
