import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'https://kytbackend-8050.nodechef.com/api/';

  constructor() { }
}
