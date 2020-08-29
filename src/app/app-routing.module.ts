import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  /*{
    path: 'jugadores',
    loadChildren: () => import('./jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },*/
  {
    path: "jugadores",
    children: [
      {
        path: "",
        //loadChildren: () =>
        //  import("./home/home.module").then(m => m.HomePageModule)
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: ":posicion",
        loadChildren: () =>
          import("./pages/jugadores/jugadores.module").then(
            m => m.JugadoresPageModule
          )
      }
    ]
  },
  {
    path: "entrenadores",
    loadChildren: () =>
      import("./pages/entrenadores/entrenadores.module").then(
        m => m.EntrenadoresPageModule
      )
  },
  {
    path: "patrocinadores",
    loadChildren: () =>
      import("./pages/patrocinadores/patrocinadores.module").then(
        m => m.PatrocinadoresPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
