import { Directive, ElementRef, Renderer, HostListener, Input, NgZone, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from './domhandler';
declare var $: any;
/**
 * Directive to make the HTML table columns resizable.
 *
 * USAGE - Add the below span in <th> with the directive included and pass the id of tbody of the table.
 * Also add the classes used in the library.component.scss.
 *
 * <span class="ui-column-resizer" appResizableColumns="idOfTbody"></span>
 */

@Directive({
  selector: '[appResizableColumns]'
})
export class ResizableColumnsDirective implements AfterViewInit, OnDestroy {

  // tableViewChild: any;
  // resizeHelperViewChild: any;
 // containerViewChild: any;
  lastResizerHelperX: any;
  @Input() containerId: string;
  @Input() resizeDivId: string;
  @Input() tableId: string;
  @Input() columnResizeMode = 'fit';


  // resizer: HTMLSpanElement;
  resizerMouseDownListener: any;
  documentMouseMoveListener: any;
  documentMouseUpListener: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    public zone: NgZone,
    public domHandler: DomHandler,
  ) {
    console.log('id', this.containerId);
  }
  ngAfterViewInit() {
    this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
    const resizer = document.createElement('span');
    resizer.className = 'ui-column-resizer ui-clickable';
    this.el.nativeElement.appendChild(resizer);

   /*  this.zone.runOutsideAngular(() => {
      this.resizerMouseDownListener = this.onMouseDown.bind(this);
      this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
      this.resizer.addEventListener('touchstart', this.resizerMouseDownListener);
    }); */
    // Table element refrences.

  }

  bindDocumentEvents() {
    this.zone.runOutsideAngular(() => {
      this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
      document.addEventListener('mousemove', this.documentMouseMoveListener);
      document.addEventListener('touchmove', this.documentMouseMoveListener);

      this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
      document.addEventListener('mouseup', this.documentMouseUpListener);
      document.addEventListener('touchend', this.documentMouseUpListener);
    });
  }

  unbindDocumentEvents() {
    if (this.documentMouseMoveListener) {
      document.removeEventListener('mousemove', this.documentMouseMoveListener);
      document.removeEventListener('touchmove', this.documentMouseMoveListener);
      this.documentMouseMoveListener = null;
    }

    if (this.documentMouseUpListener) {
      document.removeEventListener('mouseup', this.documentMouseUpListener);
      document.removeEventListener('touchend', this.documentMouseUpListener);
      this.documentMouseUpListener = null;
    }
  }
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: Event) {
    this.onColumnResizeBegin(event);
    this.bindDocumentEvents();
  }

  onDocumentMouseMove(event: Event) {
    this.onColumnResize(event);
  }

  onDocumentMouseUp(event: Event) {
    this.onColumnResizeEnd(event, this.el.nativeElement);
    this.unbindDocumentEvents();
  }

  /* isEnabled() {
    return this.pResizableColumnDisabled !== true;
  } */

  ngOnDestroy() {
    if (this.resizerMouseDownListener) {
      // this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
      // this.resizer.removeEventListener('touchstart', this.resizerMouseDownListener);
    }

    this.unbindDocumentEvents();
  }

  /************Event impl functions**************/
  onColumnResizeBegin(event) {
    const containerViewChild = document.querySelector(this.containerId);
    const resizeHelperViewChild = document.querySelector(this.resizeDivId);
    const tableViewChild = document.querySelector(this.tableId);
    console.log('id', this.containerId);
    const containerLeft = this.domHandler.getOffset(containerViewChild).left;
    if (event.touches) {
      this.lastResizerHelperX = (event.touches[0].pageX - containerLeft + containerViewChild.scrollLeft);
    } else {
      this.lastResizerHelperX = (event.pageX - containerLeft + containerViewChild.scrollLeft);
    }

  }

  onColumnResize(event) {
    const containerViewChild = document.querySelector(this.containerId);
    const resizeHelperViewChild = document.querySelector(this.resizeDivId);
    const tableViewChild = document.querySelector(this.tableId);

    const containerLeft = this.domHandler.getOffset(containerViewChild).left;
    this.domHandler.addClass(containerViewChild, 'ui-unselectable-text');
    resizeHelperViewChild['style'].height = containerViewChild['offsetHeight'] + 'px';
    resizeHelperViewChild['style'].top = 0 + 'px';
    if (event.touches) {
      resizeHelperViewChild['style'].left = (event.touches[0].pageX - containerLeft + containerViewChild.scrollLeft) + 'px';
    } else {
      resizeHelperViewChild['style'].left = (event.pageX - containerLeft + containerViewChild.scrollLeft) + 'px';
    }
    resizeHelperViewChild['style'].display = 'block';
  }

  onColumnResizeEnd(event, column) {
    const containerViewChild = document.querySelector(this.containerId);
    const resizeHelperViewChild = document.querySelector(this.resizeDivId);
    const tableViewChild = document.querySelector(this.tableId);
    //
    const delta = resizeHelperViewChild['offsetLeft'] - this.lastResizerHelperX;
    const columnWidth = column.offsetWidth;
    const newColumnWidth = columnWidth + delta;
    const minWidth = column.style.minWidth || 15;

    if (columnWidth + delta > parseInt(minWidth)) {
      if (this.columnResizeMode === 'fit') {
        let nextColumn = column.nextElementSibling;
        while (!nextColumn.offsetParent) {
          nextColumn = nextColumn.nextElementSibling;
        }

        if (nextColumn) {
          const nextColumnWidth = nextColumn.offsetWidth - delta;
          const nextColumnMinWidth = nextColumn.style.minWidth || 15;

          if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
            column.style.width = newColumnWidth + 'px';
            if (nextColumn) {
              nextColumn.style.width = nextColumnWidth + 'px';
            }
          }
        }
      } else if (this.columnResizeMode === 'expand') {
        tableViewChild['style'].width = tableViewChild['offsetWidth'] + delta + 'px';
        column.style.width = newColumnWidth + 'px';
        const containerWidth = tableViewChild['style'].width;
        containerViewChild['style'].width = containerWidth + 'px';
      }
    }

    resizeHelperViewChild['style'].display = 'none';
    this.domHandler.removeClass(containerViewChild, 'ui-unselectable-text');
  }

}

