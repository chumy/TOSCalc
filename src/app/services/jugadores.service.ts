import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Jugador } from "../models/jugador";

@Injectable({
  providedIn: "root"
})
export class JugadoresService {
  public jugadores: Jugador[];
  public ficheros: string[];

  constructor(private http: HttpClient) {
    this.ficheros=['TOS', 'Campeones']
  /* this.getJugadores('TOS').subscribe(data => {
      this.jugadores = data;
    });*/
  }

  
  public loadJugadores(file: string): Observable<Jugador[]> {
    //console.log("Recibido" + file)
    return this.http
      .get("./assets/data/player_data_" + file +".csv", {
        responseType: "text"
      })
      .pipe(
        map(data => {
          return this.CSV2JSON(data);
        })
      );
  }

  CSVToArray(strData, strDelimiter) {
    strDelimiter = strDelimiter || ",";
    var objPattern = new RegExp(
      // Delimiters.
      "(\\" +
        strDelimiter +
        "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        // Standard fields.
        '([^"\\' +
        strDelimiter +
        "\\r\\n]*))",
      "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while ((arrMatches = objPattern.exec(strData))) {
      var strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
        arrData.push([]);
      }
      if (arrMatches[2]) {
        var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
      } else {
        var strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
  }

  CSV2JSON(csv) {
    var array = this.CSVToArray(csv, ",");

    var objArray: Jugador[] = [];
    let jugador2: Jugador;
    let variable: string = "nombre";

    //jugador2.put(variable, "2");

    for (var i = 1; i < array.length; i++) {
      //objArray[i - 1] = {};
      let jugador: Jugador = new Jugador();

      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        //objArray[i - 1][key] = array[i][k];

        jugador[key] = array[i][k];
      }

      objArray.push(jugador);
    }

    //var json = JSON.stringify(objArray);
    //var str = json.replace(/},/g, "},\r\n");

    return objArray;
  }

  getJugadoresPosicion(posicion: string): Jugador[] {
    return this.jugadores.filter(data => {
      return data[posicion] == 1;
    });
  }

  setNewFile(file) {
    
    this.loadJugadores(file).subscribe(data => {
      this.jugadores = data;
      //console.log(data);
    });

  }

  getJugadorById(id: number) {
    let jugadorSel = new Jugador();
    
    this.jugadores.filter(data => {
      if (data['id'] == id) {
        jugadorSel = data;
      }

    });
    return jugadorSel;
  }
}
