import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { NavController } from '@ionic/angular'

import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service'
import { TabsPage } from '../tabs/tabs.page';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService : AuthService,
    private alertService : AlertService,
    private navController : NavController) { }

  ngOnInit() {
  }

  register(form:NgForm){

    this.authService.register(form.value.fName,
                              form.value.lName,
                              form.value.email,
                              form.value.password)
                    .subscribe(
                        data => {
                                  console.log(data)
                                  if(data['token']){
                                    this.alertService.presentToast("User Registered")
                                    this.navController.navigateRoot('/tabs')
                                    //this.navController.setRoot('/tabs')
                                  }
                                },
                                error => {
                                  console.log(error)
                                },
                                () => {}
                              );

  }
}
