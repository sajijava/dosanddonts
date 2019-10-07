import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
//import { LaunchNavigator } from '@ionic-native/launch-navigator';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  location = {
    latitude: 0,
    longitude: 0,
    locationAddress: ""
  };

  addressTemplate = [
  	{"key":"subThoroughfare","delimiter":" "},
  	{"key":"thoroughfare","delimiter":", "},
  	{"key":"locality","delimiter":", "},
  	{"key":"administrativeArea","delimiter":" "},
  	{"key":"postalCode","delimiter":", "},
  	{"key":"countryCode","delimiter":"."}
  ];

  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
      //private launchNavigator:LaunchNavigator
    ){ }

  getCurrentLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    let geoencoderOptions: NativeGeocoderOptions = {
         useLocale: true,
         maxResults: 5
       };
    this.location.locationAddress = ""

   return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition(options)
      .then((position) => {
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;

          console.log(this.location)
          // lookup address
          this.nativeGeocoder.reverseGeocode(this.location.latitude, this.location.longitude, geoencoderOptions)
          .then((result: NativeGeocoderResult[]) => {
                  console.log(result)
                  let addressObj = result[0];
                   for (let val in this.addressTemplate) {
                     let addLine = this.addressTemplate[val]
                     let value = addressObj[addLine["key"]]
                     console.log(addLine)
                     console.log(value)
                     if(value.length)
                       this.location.locationAddress += value+addLine["delimiter"];
                   }

                  //this.location.locationAddress = this.generateAddress(result[0]);
                  console.log(this.location)
                  resolve(this.location);
            })
            .catch((error: any) => {
                reject('Error getting location'+ JSON.stringify(error));
            });
      })
    })
  }





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

  // navigatetoLocation(){
  //   this.launchnavigator.isAppAvailable(this.launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
  //     var app;
  //     if(isAvailable){
  //         app = this.launchnavigator.APP.GOOGLE_MAPS;
  //     }else{
  //         console.warn("Google Maps not available - falling back to user selection");
  //         app = this.launchnavigator.APP.USER_SELECT;
  //     }
  //     // launchnavigator.navigate("London, UK", {
  //     //     app: app
  //     // });
  //   });
  // }
  // async getLocationAddress(){
  //      let geoencoderOptions: NativeGeocoderOptions = {
  //           useLocale: true,
  //           maxResults: 5
  //         };
  //         console.log(this.location)
  //    return await this.nativeGeocoder.reverseGeocode(this.location.latitude, this.location.longitude, geoencoderOptions)
  //               .then((result: NativeGeocoderResult[]) => {
  //                  console.log(result)
  //                  this.currentAddress = this.generateAddress(result[0]);
  //                  console.log(this.currentAddress)
  //                  return this.currentAddress;
  //                })
  //              .catch((error: any) => {
  //                alert('Error getting location'+ JSON.stringify(error));
  //              });
  //  }


}
