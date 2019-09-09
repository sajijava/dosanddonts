import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'entities', loadChildren: './pages/entities/entities.module#EntitiesPageModule' },
  // { path: 'entity-details/:id', loadChildren: './pages/entity-details/entity-details.module#EntityDetailsPageModule' },
  //{ path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'tabs-home', loadChildren: './tabs-home/tabs-home.module#TabsHomePageModule' },
  // { path: 'tabs-search', loadChildren: './tabs-search/tabs-search.module#TabsSearchPageModule' },
  // { path: 'tabs-update', loadChildren: './tabs-update/tabs-update.module#TabsUpdatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
