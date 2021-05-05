import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items = new BehaviorSubject<any[]>([]);
  constructor() { }
  
}
