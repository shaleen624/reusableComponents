import { DomHandler } from './components/directives/domhandler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ResizableColumnsDirective } from './components/directives/column-draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    ResizableColumnsDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [DomHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
