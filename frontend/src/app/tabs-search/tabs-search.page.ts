import { Component, OnInit } from '@angular/core';
import { EntityService, Entity} from '../services/entity.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-tabs-search',
  templateUrl: './tabs-search.page.html',
  styleUrls: ['./tabs-search.page.scss'],
})
export class TabsSearchPage implements OnInit {
  results : Entity[]
  location: {
    latitude: number,
    longitude: number
  };
  geoAddress: string;
  searchTerm: string
  constructor(private entityService: EntityService,
    private logger: NGXLogger,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
    )
    { }

  ngOnInit() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

   this.geolocation.getCurrentPosition(options)
      .then((position) => {

          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(this.location)
          //this.getEntitiesForCurrentLocation(40.570545, -74.277186)
          this.getEntitiesForCurrentLocation()
          this.getGeoencoder()
          //this.mapsProvider.init(this.location, this.mapElement);
      })

    }


  getCurrentLocation(){
    return this.geolocation.getCurrentPosition();
    //return new Promise(function(resolve, reject){resolve(JSON({'coords':{'latitude':40.570561,'longitude':-74.277197}})})
  }
   getEntitiesForCurrentLocation(){

           this.entityService.getEntitiesByCurrentLocation(this.location.latitude, this.location.longitude,1)
           .subscribe(
               (entities : Entity[]) => {
               this.logger.debug(entities);
                 this.results = entities;
               }
           );
   }

searchChanged(event){}

   //Return Comma saperated address
       generateAddress(addressObj){
           let obj = [];
           let address = "";
           for (let key in addressObj) {
             obj.push(addressObj[key]);
           }
           obj.reverse();
           for (let val in obj) {
             if(obj[val].length)
             address += obj[val]+', ';
           }
         return address.slice(0, -2);
       }

  getGeoencoder(){
        let geoencoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(this.location.latitude, this.location.longitude, geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result)
        this.geoAddress = this.generateAddress(result[0]);
        console.log(this.geoAddress)
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
    }


  getAllEntities(){

    this.logger.debug(location);
    this.entityService.getEntity()
    .subscribe(
        (entities : Entity[]) => {
          this.logger.debug(entities);
          this.results = entities;
        }
      );

  }



}
