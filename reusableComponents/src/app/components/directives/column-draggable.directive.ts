import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appColumnDraggable]'
})
export class ColumnDraggableDirective {

  startWidth: any;
  startX: any;
  pressed: boolean;
  start: any;
  title = 'app';
  @Input('appColumnDraggable') tbodyId: string;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  private onMouseDown(event) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.clientX;
    // this.startWidth = this.elementRef.nativeElement.parentElement.clientWidth;
    let tst = this.elementRef.nativeElement;
    console.log(this.tbodyId);
    this.startWidth = $(this.start).parent().width();
    this.initResizableColumns();
  }

  private initResizableColumns() {
    this.renderer.listenGlobal('body', 'mousemove', (event) => {
      this.moveEvent(event);
    });
    // For touch screens.
    this.renderer.listenGlobal('body', 'touchmove', (event) => {
      this.moveEvent(event);
    });
    this.renderer.listenGlobal('body', 'mouseup', (event) => {
      this.endEvent();
    });
    // For touch screens.
    this.renderer.listenGlobal('body', 'touchend', (event) => {
      this.endEvent();
    });
  }
  @HostListener('touchmove', ['$event'])
  moveEvent(event) {
    if (this.pressed) {
      const width = this.startWidth + (event.clientX - this.startX);
      $(this.start).parent().css({ 'min-width': width, 'max-width': width });
      // this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement, 'min-width', width);
      // this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement, 'max-width', width);
      const index = $(this.start).parent().index() + 1;
      const tbody = this.elementRef.nativeElement.querySelector(this.tbodyId + 'tr td');
      $('#' + this.tbodyId + 'tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
    }
  }

  endEvent() {
    if (this.pressed) {
      this.pressed = false;
    }
  }

  fixColumnWidths() {
    const columns = this.elementRef.nativeElement.querySelector('th.ui-resizable-column');
    for (let i = 0; i < columns.length; i++) {
      columns[i].style.width = columns[i].offsetWidth + 'px';
    }
  }

}
