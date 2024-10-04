import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.scss'],
})
export class PersonalCardComponent  implements OnInit {

  @Input() name:string=""
  @Input() surname:string=""
  @Input() age:number=0
  @Output() emitir=new EventEmitter<string>()

  constructor() { }

  ngOnInit() {}

  onFavClick(){
    this.emitir.emit("like")
  }

  deletethis(){
    this.emitir.emit("delete")
  }

}
