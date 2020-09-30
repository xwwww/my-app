/*
 * @Des: 拖拽
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs'
import { map, switchMap, switchMapTo, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.styl']
})
export class DragComponent implements OnInit {
  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const box = document.getElementById('box')
    const mouseDown$ = fromEvent(box, 'mousedown')
    const mouseMove$ = fromEvent(box, 'mousemove')
    const mouseUp$ = fromEvent(box, 'mouseup')

    mouseDown$.pipe(map(event => {
      console.log(event)
      return {
        pos: this.getTranslate(box),
        event
      }
    }), switchMap(initialState => {
      console.log(initialState, 'initialState', initialState.event.clientX )
      const initialPos = initialState.pos
      const { clientX, clientY } = initialState.event
      return mouseMove$.pipe(map(moveEvent => ({
        x: moveEvent.clientX - clientX + initialPos.x,
        y: moveEvent.clientY - clientY + initialPos.x
      })))
    }), takeUntil(mouseUp$)).subscribe((pos) => { // takeUntil 就结束了？？？
      console.log(pos, 111) 
      this.setTranslate(box, pos)
    })
  }

  getTranslate(element) {
    const result = {
      x: element.getClientRects()[0].x,
      y: element.getClientRects()[0].y
    }
    console.log(result, '>>>')
    if (result) {
      return {
        x: result.x,
        y: result.y
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
  
  setTranslate(element, pos) {
    element.style.transform = `translate(${pos.x}px, ${pos.y}px)`
  }
}
