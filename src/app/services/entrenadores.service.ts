import { Injectable } from "@angular/core";
import { Entrenador } from "../models/entrenador";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EntrenadoresService {
  public entrenadores: Entrenador[];

  constructor(private http: HttpClient) {
    this.getEntrenadores().subscribe(data => {
      this.entrenadores = data;
    });
  }

  public getEntrenadores(): Observable<Entrenador[]> {
    return this.http
      .get("./assets/data/coaches_data.csv", {
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

    var objArray: Entrenador[] = [];

    for (var i = 1; i < array.length; i++) {
      let entrenador: Entrenador = new Entrenador();

      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];

        entrenador[key] = array[i][k];
      }

      objArray.push(entrenador);
    }

    return objArray;
  }
}
