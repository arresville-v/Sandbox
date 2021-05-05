import { Component, OnInit, Input, EventEmitter, Output, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ItemService } from 'src/app/core/item.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string;
  @Output() onRemove = new EventEmitter<void>();
  control = new FormControl();

  options: string[] = ['One', 'Two', 'Three'];
  filteredItems: Observable<string[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private value: string;
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
    this.filteredItems = this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(''),
        map(value => this._filter(value))
      )
  }
  writeValue(value) {
    this.onChange(value);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.itemService.items.value.filter(item => item.Name.toLowerCase().includes(filterValue)).map(item => item.Name);
  }

}
