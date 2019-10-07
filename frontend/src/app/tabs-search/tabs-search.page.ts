import { Component, OnInit } from '@angular/core';
import { EntityService, Entity} from '../services/entity.service';
import { GeolocationService} from '../services/geolocation.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-tabs-search',
  templateUrl: './tabs-search.page.html',
  styleUrls: ['./tabs-search.page.scss'],
})
export class TabsSearchPage implements OnInit {
  results : any = []
  location: {
    latitude: number,
    longitude: number
  };
  currentAddress: string;
  searchTerm: string;
  categories: string;
  entityDetails:any = [];
  operatingTime:[];

  constructor(private entityService: EntityService,
    private logger: NGXLogger,
    private geoLocation: GeolocationService
    )
    { }

  ngOnInit() {
    this.getCurrentLocation()
  }

  getCurrentLocation(){
    // this.geoLocation.getCurrentLocation()
    // .then( loc => {console.log(loc)
    //     this.currentAddress = loc["locationAddress"];
    //     this.getEntitiesForCurrentLocation(loc["latitude"],loc["longitude"])
    //
    // })

    this.getEntitiesForCurrentLocation(40.5702819, -74.277234)
  }
  refreshLocation(){
    this.getCurrentLocation();
  }

  getEntitiesForCurrentLocation(latitude, longitude){
    console.log("getting entities")

    console.log(location)
    this.entityService.getEntitiesByCurrentLocation(latitude, longitude,1)
    .subscribe(
        (entities : Entity[]) => {
        this.logger.debug(entities);
          this.results = entities;
        }
    );
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
  searchChanged(event){}

  showDetails(idx){

    this.categories = ""
    this.entityDetails = []

    let eid  = this.results[idx].id
    this.results[idx].expand = !this.results[idx].expand;

    if(this.results[idx].expand){
      this.results
        .filter((item, itemIndex) => itemIndex != idx)
        .map( (item) => item.expand = false)
    }


    this.entityService.getCategories(eid)
    .subscribe(
      (categories) => {
        let catg = []
        for(let idx in categories){ // catg are index
          catg.push(categories[idx]["category"])
        }
        this.categories = catg.join(", ")
      }
    )
    this.entityService.getDetails(eid)
    .subscribe(

      (details) => {
        for(let idx in details){
          this.entityDetails.push({ "key":details[idx].key, "value":details[idx].value})
        }
      }
    )
  }



}
