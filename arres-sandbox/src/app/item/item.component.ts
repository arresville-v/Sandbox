import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../core/item.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  items: any[] = [];
  isList = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private itemService: ItemService
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.itemService.items.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.items = val;
    });
  }

  removeItem(index: number) {
    let itemArr = this.itemService.items.value;
    if (itemArr.length > 1) {
      itemArr.splice(index,1);  
    } else {
      itemArr = [];
    }
    this.itemService.items.next(itemArr);
  }

}
