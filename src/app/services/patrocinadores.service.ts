import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Patrocinador } from '../models/patrocinador';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

   public patrocinadores: Patrocinador[];

  constructor(private http: HttpClient) {
    this.getPatrocinadores().subscribe(data => {
      this.patrocinadores = data;
    });
  }

  public getPatrocinadores(): Observable<Patrocinador[]> {
    return this.http
      .get("./assets/data/patrocinadores_data.csv", {
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

    var objArray: Patrocinador[] = [];

    for (var i = 1; i < array.length; i++) {
      let patrocinador: Patrocinador = new Patrocinador();

      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];

        patrocinador[key] = array[i][k];
        
      }

      objArray.push(patrocinador);
   
    }

    return objArray;
  }

  getPatrocinador(id: number) {
    
   let patrocinador = this.patrocinadores.filter(data => {
      return data["id"] == id;
   });
    
    return patrocinador[0];
  }
}
