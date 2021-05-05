import { Component, OnInit, Input, EventEmitter, Output, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string;
  @Output() onRemove = new EventEmitter<void>();
  control = new FormControl();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private value: string;
  onTouched: () => void;
  constructor() { }
  onChange: any = (val) => {};

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.writeValue(val);
    })
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

}
