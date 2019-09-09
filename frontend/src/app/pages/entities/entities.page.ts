import { Component, OnInit } from '@angular/core';
import { EntityService, Entity} from '../../services/entity.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder,NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-entities',
  templateUrl: './entities.page.html',
  styleUrls: ['./entities.page.scss'],
})
export class EntitiesPage implements OnInit {

  results : Entity[]
  location: {
    latitude: number,
    longitude: number
  };
  // geoencoderOptions: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };

  constructor(private entityService: EntityService,
    private logger: NGXLogger//,
  //  private geolocation: Geolocation,
  //  private nativeGeocoder: NativeGeocoder
    )
    { }

  ngOnInit() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    // this.geolocation.getCurrentPosition(options).then((position) => {
    //
    //   this.location = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   };
      this.getEntitiesForCurrentLocation(40.570545, -74.277186)
      //this.mapsProvider.init(this.location, this.mapElement);


  }

  // getCurrentLocation(){
  //   //return this.geolocation.getCurrentPosition();
  //   return new Promise(function(resolve, reject){resolve(JSON({'coords':{'latitude':40.570561,'longitude':-74.277197}})})
  // }
   getEntitiesForCurrentLocation(latitude, longitude){

           this.entityService.getEntitiesByCurrentLocation(latitude, longitude,1)
           .subscribe(
               (entities : Entity[]) => {
               this.logger.debug(entities);
                 this.results = entities;
               }
           );
   }


  // getGeoencoder(latitude,longitude){
  //     this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
  //     .then((result: NativeGeocoderReverseResult[]) => {
  //       this.geoAddress = this.generateAddress(result[0]);
  //     })
  //     .catch((error: any) => {
  //       alert('Error getting location'+ JSON.stringify(error));
  //     });
  //   }


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
