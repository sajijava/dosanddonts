export class Entity {
   entityUID: string;
   companyName: string;
   numYears: number;
   constructor(values: Object = {}) {
      this.companyName = values['COMPANY_NAME']
        console.log(values)
   }
}
