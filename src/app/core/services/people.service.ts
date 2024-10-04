import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { person } from '../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private dataservice:DataService<person>) { }

  
  public create(value: person): Observable<person> {
    return this.dataservice.create(value)
  }

  public requestAll(): Observable<person[]> {
      return this.dataservice.$observable
  }

  public requesbyId(id: string): Observable<person | null> {
      return this.dataservice.requesbyId(id)
  }

  public update(id: string, value: person): Observable<person | null> {
      return this.dataservice.update(id,value)
  }

  public delete(id: string): Observable<person | null> {
      return this.dataservice.delete(id)
  }








}
