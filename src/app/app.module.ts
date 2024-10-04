import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './core/interfaces/data-service';
import { DataInMemoryService } from './core/services/data-in-memory.service';
import { DataInNavegatorService } from './core/services/data-in-navegator.service';
import { CookieService } from 'ngx-cookie-service';

export function DataServiceFactory(backend:string,cookie:CookieService){
  switch(backend){
    case 'inmemory':
      console.log("inmemory")
      return new DataInMemoryService()
    case 'navegator':
      console.log("navegator")
      return new DataInNavegatorService(cookie)
    
    default:
      throw new Error("No implementado")
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:'backend',useValue:'navegator'},
    {provide:DataService, deps:['backend',CookieService],useFactory:DataServiceFactory},
    CookieService
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
