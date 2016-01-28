import {Directive, ElementRef, Renderer, Input} from 'angular2/core';


@Directive({
  selector: '[myHighlight]',
  providers: [],
  host: {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }

})
export class HighlightDirective {
    @Input('myHighlight') highlightColor: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
      }
      onMouseEnter() { this._highlight("yellow"); }
      onMouseLeave() { this._highlight(null); }
      private _highlight(color: string) {
        this.renderer.setElementStyle(this.el, 'backgroundColor', this.highlightColor);
      }

}
