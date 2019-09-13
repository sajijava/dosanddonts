import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen }   from '@ionic-native/splash-screen/ngx';
import { StatusBar }      from '@ionic-native/status-bar/ngx';
import { Geolocation }    from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativeStorage }  from '@ionic-native/native-storage/ngx';


import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            LoggerModule.forRoot(environment.logging)],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
