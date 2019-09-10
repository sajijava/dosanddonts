import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



export class Entity {
   id: string;
   companyName: string;
   numYears: number;
   street : string;
   city : string;
   state : string;
   zip : string;
   phone : string;
   constructor(values) {
      this.companyName = values.companyName
      this.numYears = values.numYears
      this.id = values.entityUID
      this.street = values.location.street
      this.city = values.location.city
      this.state = values.location.state
      this.zip = values.location.zip
      this.phone = values.location.phone
        console.log(values)
   }
}

export class Notification{
  type:string;
  title:string;
  text:string;
  icon:string;
  color:string;
  constructor(values){
    this.type = values.type
    this.text = values.text
  }

}



@Injectable({
  providedIn: 'root'
})
export class EntityService {
  url = '/api/entities'
  constructor(private http: HttpClient, private logger: NGXLogger) { }

  getEntity() : Observable<Entity[]>{
    this.logger.debug("calling api/entities ")
    return this.http
      .get(`${this.url}`)
      .pipe(
        map(entities =>  {
          this.logger.debug(entities);
          return (entities instanceof Array)? entities.map((e) => new Entity(e)):[];
          //return entities;
          })
      );

  }
  getObservableData(response:Observable<any>):Observable<Entity[]>{
    return response.pipe(
      map(entities =>  {
        this.logger.debug(entities);
        return (entities instanceof Array)? entities.map((e) => new Entity(e)):[];
        //return entities;
        })
    );
  }
  getEntitiesByCurrentLocation(latitude,longitude,radius):Observable<Entity[]>{
    this.logger.debug("calling /api/aroundme/"+latitude+"/"+longitude+"/"+radius);

    return this.getObservableData(this.http.get("/api/aroundme/"+latitude+"/"+longitude+"/"+radius))

  }

  getNotifications():Observable<any>{
    this.logger.debug("calling /api/dailyNotifications");

    return this.http.get("/api/dailyNotifications");

  }
}
