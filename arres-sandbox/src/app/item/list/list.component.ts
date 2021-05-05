import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() item: any;
  @Output() removeItem = new EventEmitter<void>();
  itemDescriptionArr = [];
  primaryDesc = '';
  secondaryDesc = '';
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
  }

}
