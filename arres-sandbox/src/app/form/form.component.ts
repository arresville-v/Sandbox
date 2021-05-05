import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { ItemService } from '../core/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  controlType = new FormControl();
  controlLabel = new FormControl();
  form: FormGroup;
  controls: { type: number; id: number; label: string; }[] = [];
  controlList = [{
    value: 1,
    viewValue: 'Text'
  },
  {
    value: 2,
    viewValue: 'Date'
  },
  {
    value: 3,
    viewValue: 'AutoComplete'
  },
  {
    value: 4,
    viewValue: 'Linked Autocomplete'
  }];
  isLabelDuplicate = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    // Initialize with the form Control = "Name"
    this.form.addControl('Name', new FormControl());
    this.controls.push({
      type: 1,
      id: 0,
      label: 'Name'
    });
    // Check that label / form control name is always unique
    this.controlLabel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.isLabelDuplicate = this.form.get(val) ? true : false;
    })
  }

  onAddControl() {
    this.form.addControl(this.controlLabel.value, new FormControl());
    this.controls.push({
      type: this.controlType.value,
      id: this.controls.length,
      label: this.controlLabel.value
    });
    this.controlLabel.setValue('');
  }

  removeControl(label: string) {
    this.controls.splice(this.controls.findIndex(c => c.label === label), 1);
    // Add delay to wait for the component to be destroyed before removing form control
    setTimeout(() => {
      this.form.removeControl(label);  
    }, 200);
    
  }

  onSaveItem() {
    console.log(this.form.value);
    const arr = this.itemService.items.value;
    arr.push(this.form.value);
    this.itemService.items.next(arr);
  }

}
