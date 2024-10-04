import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { model } from '../interfaces/model';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class DataInNavegatorService<T extends model>extends DataService<T> {

    constructor(private cookie:CookieService) {
        console.log("data in memory navegator recolected")
        super()
        let lista=this.lista.getValue() || []
        let arrayusers=this.getarrayusers()
        console.log(arrayusers)

        if(arrayusers){
            lista.push(...arrayusers)
            this.lista.next(lista)
        }

     }



     getarrayusers():T[]{
        let string=this.cookie.get('arrayusers')
        if(string){
            let array=JSON.parse(string)
            console.log(array)
            return array
        }else{
            return []
        }        
     }

     setarrayusers(array:T[]){
        let poner=JSON.stringify(array)
        this.cookie.set("arrayusers",poner)
     }



  public override create(value: T): Observable<T> {
      value.id=this.generarCodigoAlfanumerico()
      let array=this.getarrayusers()
      console.log(array)
      if(array===null){
        let arraynuevo:T[]=[]
        arraynuevo.push(value)
        this.setarrayusers(arraynuevo)
        this.lista.next(arraynuevo)
      }else{
        array.push(value)
        this.setarrayusers(array)
        this.lista.next(array)
      }
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
      let array:T[]=this.getarrayusers()
      let index=array.findIndex(c=>c.id==id)
      if(index!=-1){
        let person=array[index]
        array.splice(index,1)
        this.setarrayusers(array)
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
