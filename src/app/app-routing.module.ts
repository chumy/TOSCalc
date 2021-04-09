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
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: ":posicion",
        loadChildren: () =>
          import("./pages/entrenadores/entrenadores.module").then(
            m => m.EntrenadoresPageModule
          )
      }
    ]
  },
  {
    path: "patrocinadores",
     children: [
      {
        path: "",
        redirectTo: "club",
        pathMatch: "full"
      },
      {
        path: ":posicion",
        loadChildren: () =>
          import("./pages/patrocinadores/patrocinadores.module").then(
        m => m.PatrocinadoresPageModule
          )
      }
    ]
  },

  {
    path: 'banquillo',
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: ":posicion",
        loadChildren: () => import('./pages/banquillo/banquillo.module').then(m => m.BanquilloPageModule)
      },
    ]
  },
  {
    path: "club",
    loadChildren: () =>
      import("./pages/club/club.module").then(m => m.ClubPageModule)
  },
  {
    path: "empleados",
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: ":posicion",
        loadChildren: () =>
          import("./pages/empleados/empleados.module").then(
            m => m.EmpleadosPageModule
          )
      }
    ]
  },
  {
    path: 'mods',
    loadChildren: () => import('./pages/mods/mods.module').then( m => m.ModsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
