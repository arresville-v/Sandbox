import { Component, OnInit, Input, OnDestroy, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
})
export class TextComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
