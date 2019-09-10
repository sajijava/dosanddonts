import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: '', redirectTo:'/tabs/home',  pathMatch:'full' },
        { path: 'home', loadChildren: '../tabs-home/tabs-home.module#TabsHomePageModule'},
        { path: 'locate', loadChildren: '../tabs-search/tabs-search.module#TabsSearchPageModule' },
        { path: 'update', loadChildren: '../tabs-update/tabs-update.module#TabsUpdatePageModule' },
        { path: 'settings', loadChildren: '../tabs-settings/tabs-settings.module#TabsSettingsPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/home',
    pathMatch:'full'
  }
];

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
