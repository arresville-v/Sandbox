import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;
  @Output() removeItem = new EventEmitter<void>();
  itemDescriptionArr = [];
  primaryDesc = '';
  secondaryDesc = '';
  imageString = '';
  constructor() { }

  ngOnInit(): void {
    this.itemDescriptionArr = Object.keys(this.item).filter(item => {
      if (item !== 'Name') {
        return true;
      }
    }).map(key => {
      return {value: this.item[key], key };
    });
    this.primaryDesc = this.itemDescriptionArr[0] ? this.itemDescriptionArr[0].value : '';
    this.secondaryDesc = this.itemDescriptionArr[1] ? this.itemDescriptionArr[1].value : '';
    const random = Math.random();
    if (random > 0 && random < .3) {
      this.imageString = '../../assets/moving.jpg';
    } else if (random > .3 && random < .7){ 
      this.imageString = '../../assets/hobbies.jpg';
    } else {
      this.imageString = '../../assets/teuku.jpg';
    }
  }
}
