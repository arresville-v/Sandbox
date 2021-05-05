import { Component, OnInit, Input, EventEmitter, Output, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ItemService } from 'src/app/core/item.service';

@Component({
  selector: 'app-linked',
  templateUrl: './linked.component.html',
  styleUrls: ['./linked.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinkedComponent),
      multi: true,
    },
  ],
})
export class LinkedComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string;
  @Output() onRemove = new EventEmitter<void>();
  parent_control = new FormControl();
  child_control = new FormControl();
  parentItems: { id: number; value: string }[] = [];
  childItems: { id: number; value: string; parent_id: number; }[] = [];
  options: string[] = ['One', 'Two', 'Three'];

  filteredItems: Observable<{ id: number; value: string; parent_id: number; }[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private value: string = '';
  onTouched: () => void;
  constructor(
    private itemService: ItemService
  ) { }
  onChange: any = (val) => { };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    // Mock backend data
    fetch('../../assets/parent_items.json')
      .then(response => response.json())
      .then(data => {
        this.parentItems = data;
        fetch('../../assets/child_items.json')
          .then(response => response.json())
          .then(data => {
            this.childItems = data;
            console.log(this.parentItems, this.childItems);
            this.filteredItems = this.parent_control.valueChanges
              .pipe(
                takeUntil(this.destroy$),
                startWith(''),
                map(value => this._filter(value.id))
              );
          });
      });


  }
  writeValue() {
    this.value = `${this.parent_control.value ? this.parent_control.value.value : ''}|${this.child_control.value ? this.child_control.value : ''}`;
    this.onChange(this.value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
    if (this.value == null) {
      this.onChange(this.value);
    }
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  getDisplayValue(value: { id: number; value: string }): string {
    return value ? value.value : '';
  }

  private _filter(parentId: number): { id: number; value: string; parent_id: number; }[] {
    return this.childItems.filter(item => item.parent_id === parentId);
  }

}
