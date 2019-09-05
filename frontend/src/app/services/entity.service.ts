import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



export class Entity {
   entityUID: string;
   companyName: string;
   numYears: number;
   constructor(values: Object = {}) {
      this.companyName = values['COMPANY_NAME']
        console.log(values)
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


        //,catchError((err: HttpErrorResponse) => { console.error(err);})
      );

  }
}
