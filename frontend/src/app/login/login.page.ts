import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { NavController } from '@ionic/angular'

import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }


  login(form:NgForm){
    this.authService.login(form.value.email, form.value.password)
    .subscribe(
      data =>{
        this.alertService.presentToast("Logged In")
      },
      error => {
        console.log(error);
      },
      () => {
        this.navController.navigateRoot('/tabs')
      }
    )
  }
}
