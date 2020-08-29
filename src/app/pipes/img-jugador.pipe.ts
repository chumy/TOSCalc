import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imgJugador"
})
export class ImgJugadorPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return "assets/images/jugador_vacio.jpg";

    return "assets/images/jugadores/" + value + ".jpg";
  }
}
