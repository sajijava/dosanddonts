import { Component, OnInit } from '@angular/core';
import { EntityService, Entity,Notification} from '../services/entity.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-tabs-home',
  templateUrl: './tabs-home.page.html',
  styleUrls: ['./tabs-home.page.scss'],
})



export class TabsHomePage implements OnInit {

  notifications=[];


  constructor(private entityService: EntityService,
    private logger: NGXLogger) { }

  ngOnInit() {
    this.getDailyNotifications();
  }

  getDailyNotifications(){

          this.entityService.getNotifications()
          .subscribe((notes ) => {
                notes.map((x) => {
                  let note = new Notification(x);

                   if(x.type == 'DYK'){
                     note.icon = 'bulb'
                     note.title = 'Did You Know...';
                     note.color = "primary"
                   }else if(x.type == 'NOF'){
                     note.icon = 'medal'
                     note.title = 'New Offer!!!';
                     note.color = "success"
                   }else if(x.type == 'LRT'){
                     note.icon = 'alert'
                     note.title = '*** ALERT *** ';
                     note.color = "warning"
                   }

                  this.notifications.push(note);
                } )

                console.log(this.notifications)
              });
          }
}
