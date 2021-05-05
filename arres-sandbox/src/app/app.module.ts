import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { EventComponent } from './event/event.component';
import { AutoCompleteComponent } from './form/autocomplete/autocomplete.component';
import { LinkedComponent } from './form/linked/linked.component';
import { TextComponent } from './form/text/text.component';
import { DateComponent } from './form/date/date.component';
import { CardComponent } from './item/card/card.component';
import { ListComponent } from './item/list/list.component';
import { ItemComponent } from './item/item.component';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EventComponent,
    AutoCompleteComponent,
    LinkedComponent,
    TextComponent,
    DateComponent,
    ItemComponent,
    CardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
