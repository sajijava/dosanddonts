import { Component, OnInit } from '@angular/core';
import { EntityService, Entity} from '../../services/entity.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.page.html',
  styleUrls: ['./entities.page.scss'],
})
export class EntitiesPage implements OnInit {

  results : Entity[]
  constructor(private entityService: EntityService, private logger: NGXLogger) { }

  ngOnInit() {
    this.getAllEntities();
  }

  getAllEntities(){
    this.entityService.getEntity()
    .subscribe(
        (entities : Entity[]) => {
          this.logger.debug(entities);
          this.results = entities;
        }
      );

  }
}
