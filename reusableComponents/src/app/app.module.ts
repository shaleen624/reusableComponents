import { DomHandler } from './components/directives/domhandler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import {DndModule} from 'ng2-dnd';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { ResizableColumnsDirective } from './components/directives/column-draggable.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ResizableColumnsDirective
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    FormsModule,
    DndModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  providers: [DomHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
