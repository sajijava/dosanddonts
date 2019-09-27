import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-tabs-settings',
  templateUrl: './tabs-settings.page.html',
  styleUrls: ['./tabs-settings.page.scss'],
})
export class TabsSettingsPage implements OnInit {

  user = {firstName:'',lastName:'',email:'',password:''}
  constructor(private authService:AuthService) { }

  ngOnInit() {
    //this.user = this.authService.userByEmail();
  }

}
