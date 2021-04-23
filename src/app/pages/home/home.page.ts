import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { JugadoresPage } from "../jugadores/jugadores.page";
import { AlineacionService } from "src/app/services/alineacion.service";
import { JugadoresService } from "src/app/services/jugadores.service";
import { Jugador } from "src/app/models/jugador";
import { Entrenador } from "src/app/models/entrenador";
import { EntrenadoresService } from "src/app/services/entrenadores.service";
import { Location } from "@angular/common";
import { Plugins } from '@capacitor/core';
import { Empleado } from "src/app/models/empleado";
import { EmpleadosService } from "src/app/services/empleados.service";
import { PatrocinadoresService } from "src/app/services/patrocinadores.service";
import { Patrocinador } from "src/app/models/patrocinador";
const { App } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  alineacion: any;
  jugadoresPage: any;
  jugadores: Jugador[];
  entrenadores: Entrenador[];
  isData: boolean = false;
  subscribe: any;
  empleados: Empleado[];
  patrocinadores: Patrocinador[];
  coleccion: number;
  ficheros: string[];
  showNombre: boolean;
  

 

  constructor(
    private _alineacionService: AlineacionService,
    private _jugadorService: JugadoresService,
    private _entreandorService: EntrenadoresService,
    private _empleadoService: EmpleadosService,
    private _patrocinadorService : PatrocinadoresService,
    public navCtrl: NavController,
    public platform: Platform,
    private _location: Location
  ) {
    this.alineacion = _alineacionService.alineacion;
    this.jugadoresPage = JugadoresPage;
    this.entrenadores = _entreandorService.entrenadores;
    this.empleados = _empleadoService.empleados;
    this.patrocinadores = this._patrocinadorService.patrocinadores;
    ///this.jugadores = _jugadorService.getJugadores(this.alineacion.mod);
    /*_jugadorService.getJugadores(this.alineacion.mod).subscribe(data => {
      this.jugadores = data;
      console.log("recibiendo " +data)
    });*/
     _jugadorService.setNewFile(this.alineacion.mod);
    this.subscribe = this.platform.backButton.subscribeWithPriority(
      666666,
      () => {
        //if (this.constructor.name == "HomePage") {
        if (this._location.isCurrentPathEqualTo("/home")) {
          
            //navigator["app"].exitApp();
            App.exitApp();
        } else {
          this._location.back();
        }
      }
    );


    
  }

  ionViewWillEnter() {
    this.alineacion = this._alineacionService.alineacion;
    this.jugadores = this._jugadorService.jugadores;
    }

  async ngOnInit() {
    this.alineacion = this._alineacionService.alineacion;
    this.jugadores = this._jugadorService.jugadores;
    this.showNombre = false;
    //console.log(this.alineacion);
    this._empleadoService.getEmpleados().subscribe(data => {
      this.isData = true;
      this.setEmpleadosIniciales();
      return data;
    });
    


    
    
  }

  public getImgJugador(posicion: string): string {
    
    //console.log("assets/images/jugadores/" + this.alineacion.mod + "/" + this.alineacion[posicion].id + ".jpg");
    return this.alineacion[posicion].id
      ? "assets/images/jugadores/" + this.alineacion.mod + "/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/jugador_vacio.jpg";
  }

  public getImgEntrenador(posicion: string): string {
    return this.alineacion[posicion].id
      ? "assets/images/entrenadores/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/entrenadores/entrenador_vacio_gris.jpg";
  }

  public getImgBench(posicion: string): string {
    
    let tipo = (!!this.alineacion[posicion].isEntrenador) ? 'entrenadores' : 'jugadores/' + this.alineacion.mod;

    return this.alineacion[posicion].id
      ? "assets/images/" + tipo + "/" + this.alineacion[posicion].id + ".jpg"
      : "assets/images/bench.jpg";
  }

  setEmpleadosIniciales() {
    let entrenador = this._entreandorService.getEntrenador(901);
    this.alineacion['COACH1'] = entrenador;

    let empleado = this._empleadoService.getEmpleado(800);
    this.alineacion['AGENTE'] = empleado;
    empleado = this._empleadoService.getEmpleado(700);
    this.alineacion['OJEADOR'] = empleado;
    empleado = this._empleadoService.getEmpleado(600);
    this.alineacion['CM'] = empleado;

    this._alineacionService.actualizarGanancias();
    
    

  }

  public updateAficion() {
    this._alineacionService.actualizarGanancias();
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

 
}
