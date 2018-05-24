import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ColumnDraggableDirective } from './components/directives/column-draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    ColumnDraggableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
