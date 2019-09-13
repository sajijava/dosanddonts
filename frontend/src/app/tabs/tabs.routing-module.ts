import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guard/auth.guard'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate:[AuthGuard],
    children:[
        { path: '', redirectTo:'home',  pathMatch:'full'  },
        { path: 'home', loadChildren: '../tabs-home/tabs-home.module#TabsHomePageModule'},
        { path: 'locate', loadChildren: '../tabs-search/tabs-search.module#TabsSearchPageModule' },
        { path: 'update', loadChildren: '../tabs-update/tabs-update.module#TabsUpdatePageModule' },
        { path: 'settings', loadChildren: '../tabs-settings/tabs-settings.module#TabsSettingsPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'tabs/home',
    pathMatch:'full',
    canActivate:[AuthGuard]
  }
];

//
// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     //canActivate:[AuthGuard],
//     children: [
//       {
//         path: 'home',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../tabs-home/tabs-home.module').then(m => m.TabsHomePageModule)
//           }
//         ]
//       },
//       {
//         path: 'locate',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../tabs-search/tabs-search.module').then(m => m.TabsSearchPageModule)
//           }
//         ]
//       },
//       {
//         path: 'update',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../tabs-update/tabs-update.module').then(m => m.TabsUpdatePageModule)
//           }
//         ]
//       },
//       {
//         path: 'settings',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../tabs-settings/tabs-settings.module').then(m => m.TabsSettingsPageModule)
//           }
//         ]
//       },
//       {
//         path: '',
//         redirectTo: '/home',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tabs/home',
//     pathMatch: 'full',
//   //  canActivate:[AuthGuard]
//   }
// ];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}
