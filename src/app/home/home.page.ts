import { Component } from '@angular/core';
import { PeopleService } from '../core/services/people.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public peopleservice:PeopleService) {
  }


  async submit(name:IonInput,surname:IonInput,age:IonInput){
    console.log(name)
    let name1=await name.getInputElement()
    let surname1=await surname.getInputElement()
    let age1=await age.getInputElement()
    this.peopleservice.create({name:name1.value,surname:surname1.value,age:parseInt(age1.value)})

  }


  recibirmensaje(evento:string,id:string){
    switch(evento){
      case "delete":{
        this.eliminaruser(id)
      }

    }
  }

  eliminaruser(id:string){
    this.peopleservice.delete(id)
  }

}
