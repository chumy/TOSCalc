import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alineacion } from 'src/app/models/alineacion';
import { Patrocinador } from 'src/app/models/patrocinador';
import { AlineacionService } from 'src/app/services/alineacion.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores.service';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.page.html',
  styleUrls: ['./patrocinadores.page.scss'],
})
export class PatrocinadoresPage implements OnInit {

  patrocinadores: Patrocinador[];
  posicion: string;
  alineacion: Alineacion;


  constructor(
    private _patrocinadorService: PatrocinadoresService,
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
      this.patrocinadores = this._patrocinadorService.patrocinadores.filter(data => {
        
        return data[this.posicion] == 1;
      });
      
      
    });
  }

  public patrocinadorSeleccionado(id: string, posicion: string) {
    let patrocinador = this.patrocinadores.filter(data => {
      return data["id"] == parseInt(id);
    });

    this._alineacionService.guardarPatrocinadorPosicion(
      patrocinador[0],
      posicion
    );

    this.router.navigateByUrl("/home");
  }

  removePatrocinador(posicion: string) {
    
    this._alineacionService.eliminarPatrocinador(posicion);

    this.router.navigateByUrl("/home");
  }


}
