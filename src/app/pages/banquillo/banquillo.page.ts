import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alineacion } from 'src/app/models/alineacion';
import { AlineacionService } from 'src/app/services/alineacion.service';

@Component({
  selector: 'app-banquillo',
  templateUrl: './banquillo.page.html',
  styleUrls: ['./banquillo.page.scss'],
})
export class BanquilloPage implements OnInit {

  posicion: string;
  alineacion: Alineacion;

  constructor(
    private _alineacionService: AlineacionService,
    private activatedroute: ActivatedRoute,
    public router: Router
  ) {}

  async ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const newLocal = "posicion";
      this.posicion = paramMap.get(newLocal);
      
      this.alineacion = this._alineacionService.alineacion;
      
    });
  }

  removeBanquillo(posicion) {    
    this._alineacionService.eliminarBanquillo(posicion);

    this.router.navigateByUrl("/home");
  }

 

}
