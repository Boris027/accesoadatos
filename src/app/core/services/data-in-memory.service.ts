import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { model } from '../interfaces/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataInMemoryService<T extends model>extends DataService<T> {

    constructor() {
        console.log("data in memory created")
        super()
     }



  public override create(value: T): Observable<T> {
      let array=this.lista.getValue()
      value.id=this.generarCodigoAlfanumerico()
      array.push(value)
      return of(value)
  }

  public override requestAll(): Observable<T[]> {
      return this.$observable
  }

  public override requesbyId(id: string): Observable<T | null> {
      let array=this.lista.getValue()
    let index=array.findIndex(c=>c.id==id)
    if(index!=-1){
      let value=array[index]
      return of(value)
    }else{
      return of(null)
    }
  }

  public override update(id: string, value: T): Observable<T | null> {
    let array=this.lista.getValue()
    let index=array.findIndex(c=>c.id==id)
    if(index!=-1){
      array[index]=value
      this.lista.next(array)
      return of(value)
    }else{
      return of(null)
    }
  }

  public override delete(id: string): Observable<T | null> {
      let array=this.lista.getValue()
      let index=array.findIndex(c=>c.id==id)
      if(index!=-1){
        let person=array[index]
        array.splice(index,1)
        this.lista.next(array)
        return of(person)
      }else{
        return of(null)
      }
  }


  private generarCodigoAlfanumerico(): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return codigo;
  }

  
}
