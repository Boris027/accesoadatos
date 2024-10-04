import { Injectable } from '@angular/core';
import { model } from './model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class DataService<T extends model>{

    protected lista:BehaviorSubject<T[]>=new BehaviorSubject<T[]>([])
    public $observable:Observable<T[]>=this.lista.asObservable()
    public abstract create(value:T):Observable<T>
    public abstract requestAll():Observable<T[]>
    public abstract requesbyId(id:string):Observable<T|null>
    public abstract update(id:string,value:T):Observable<T|null>
    public abstract delete(id:string):Observable<T|null>


}