import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NavController } from '@ionic/angular'

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertService: AlertService,
    private navController: NavController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  logout(){
    // this.authService.logout()
    //     .subscribe(
    //       data => { this.alertService.presentToast(data['message'])},
    //       error => { console.log( error)},
    //       () => { this.navController.navigateRoot('/tabs')}
    //     )
  }
}
