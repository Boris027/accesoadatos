import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCardComponent } from './components/personal-card/personal-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PersonalCardComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[PersonalCardComponent]
})
export class SharedModule { }
