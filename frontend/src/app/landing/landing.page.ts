import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { NavController } from '@ionic/angular'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
      private authService: AuthService,
      private navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.authService.getToken().then(() => {
    if(this.authService.isLoggedIn) {
      this.navController.navigateRoot('/tabs');
    }else{
      this.navController.navigateRoot('/login');
    }
  });
  }
}
