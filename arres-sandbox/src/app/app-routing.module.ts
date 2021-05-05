import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: 'form',
    component: FormComponent
  },
  { path: '',
    component: EventComponent 
  },
  { path: 'items',
    component: ItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
