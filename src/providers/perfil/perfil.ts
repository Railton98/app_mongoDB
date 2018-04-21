import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {

  public url = "http://localhost:8000/profile";

  constructor(public http: HttpClient) {
    console.log('Hello PerfilProvider Provider');
  }

  public findAll():Observable<any>{
    return this.http.get(this.url);
  }

}
