import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import {CONST_EXPR, Type} from 'angular2/src/facade/lang';
import {Logger} from '../../services/logger/logger';

var SUFFIXES = /(-gt)?-(sm|md|lg)/g;
var WHITESPACE = /\s+/g;

var FLEX_OPTIONS = ['grow', 'initial', 'auto', 'none', 'noshrink', 'nogrow'];
var LAYOUT_OPTIONS = ['row', 'column'];
var ALIGNMENT_MAIN_AXIS = ["", "start", "center", "end", "stretch", "space-around", "space-between"];
var ALIGNMENT_CROSS_AXIS = ["", "start", "center", "end", "stretch"];

var BREAKPOINTS = ["", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl"];
var API_WITH_VALUES = ["layout", "flex", "flex-order", "flex-offset", "layout-align"];
var API_NO_VALUES = ["show", "hide", "layout-padding", "layout-margin"];

@Directive({
    selector: '[layout]'
})
export class Layout {

    @Input('layout') _direction: string;

    _defaultDirection: string = 'row';
    direction: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        // renderer.setElementClass(el, 'layout-row', true)
    }

    ngOnInit() {
        this.direction = this._direction || this._defaultDirection;
        this.renderer.setElementClass(this.el, `layout-${this.direction}`, true);
    }
}

@Directive({
    selector: '[layout-wrap]'
})
export class LayoutWrap {
    constructor(el: ElementRef, renderer: Renderer) {
        renderer.setElementClass(el, 'layout-wrap', true);
    }
}

@Directive({
    selector: '[layout-nowrap]'
})
export class LayoutNoWrap {
    constructor(el: ElementRef, renderer: Renderer) {
        renderer.setElementClass(el, 'layout-nowrap', true);
    }
}

@Directive({
    selector: '[layout-align]'
})
export class LayoutAlign {

    @Input('layout-align') _align: string;

    _defaultAlign: string = 'start-start';
    align: string;

    constructor(private el: ElementRef, private renderer: Renderer, private Logger: Logger) { }

    ngOnInit() {

        let axes: string[] = [];
        let mainAxisValid: boolean = true;
        let crossAxisValid: boolean = true;

        axes = this._align.split(WHITESPACE);
        console.log(axes);

        (ALIGNMENT_MAIN_AXIS.indexOf(axes[0]) > -1) ? mainAxisValid = mainAxisValid : mainAxisValid = false;
        (ALIGNMENT_CROSS_AXIS.indexOf(axes[1]) > -1) ? crossAxisValid = crossAxisValid : crossAxisValid = false;

        if (mainAxisValid) {
            if (crossAxisValid) {
                this.align = this._align.replace(WHITESPACE, '-') || this._defaultAlign;
                this.renderer.setElementClass(this.el, `layout-align-${this.align}`, true);
            } else {
                this.Logger.warn(`The '${axes[1]}' value is not supported as a cross axis value. Layout alignment hasn't been set!`);
                this.renderer.setElementClass(this.el, `layout-align`, true);
            }
        } else {
            this.Logger.warn(`The '${axes[0]}' value is not supported as a cross axis value for the element. Layout alignment hasn't been set!`)
            this.renderer.setElementClass(this.el, `layout-align`, true);
        }

    }
}

@Directive({
    selector: '[flex]'
})
export class Flex {

    @Input('flex') _size: string;

    _defaultSize: string;
    size: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        // renderer.setElementClass(el, 'flex-25', true)
    }

    ngOnInit() {
        this.size = this._size || this._defaultSize;
        this.renderer.setElementClass(this.el, `flex${(this.size) ? '-' + this.size : ''}`, true);
    }

}


export const LAYOUT_DIRECTIVES: Type[] = CONST_EXPR([Layout, LayoutWrap, LayoutNoWrap, LayoutAlign, Flex]);
