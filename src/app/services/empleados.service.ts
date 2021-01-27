import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Empleado } from "../models/empleado";

@Injectable({
  providedIn: 'root'
})
  
export class EmpleadosService {

  public empleados: Empleado[];

  constructor(private http: HttpClient) {
    this.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  public getEmpleados(): Observable<Empleado[]> {
    return this.http
      .get("./assets/data/empleados_data.csv", {
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

    var objArray: Empleado[] = [];

    for (var i = 1; i < array.length; i++) {
      let empleado: Empleado = new Empleado();

      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];

        empleado[key] = array[i][k];
        
      }

      objArray.push(empleado);
     // console.log(empleado);
    }

    return objArray;
  }

  getEmpleado(id: number) {
    
   let empleado = this.empleados.filter(data => {
      return data["id"] == id;
   });
    
    return empleado[0];
  }
}
