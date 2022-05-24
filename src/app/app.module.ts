import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HistoryComponent } from './history/history.component';
import {RandomService} from "./services/random.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RandomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
