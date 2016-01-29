import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import {CONST_EXPR, Type} from 'angular2/src/facade/lang';
import {Logger} from '../../services/logger/logger';

const SUFFIXES = /(-gt)?-(xs|sm|md|lg|xl)/g;
const WHITESPACE = /\s+/g;
const BREAKPOINTS = ["", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl"];

const FLEX_OPTIONS = ['grow', 'initial', 'auto', 'none', 'noshrink', 'nogrow'];
const FLEX_VALUES = ['', '0', '5', '10', '15', '20', '25', '33', '35', '40', '45', '50', '55', '60', '65', '66', '70', '75', '80', '85', '90', '95', '100'];
const FLEX_WITH_VALUES = ["flex", 'flex-xs', 'flex-gt-xs', 'flex-sm', 'flex-gt-sm', 'flex-md', 'flex-gt-md', 'flex-lg', 'flex-gt-lg', 'flex-xl', 'flex-order', 'flex-order-xs', 'flex-order-gt-xs', 'flex-order-sm', 'flex-order-gt-sm', 'flex-order-md', 'flex-order-gt-md', 'flex-order-lg', 'flex-order-gt-lg', 'flex-order-xl', 'flex-offset', 'flex-offset-xs', 'flex-offset-gt-xs', 'flex-offset-sm', 'flex-offset-gt-sm', 'flex-offset-md', 'flex-offset-gt-md', 'flex-offset-lg', 'flex-offset-gt-lg', 'flex-offset-xl'];

const LAYOUT_OPTIONS = ['row', 'column'];
const LAYOUT_WITHOUT_OPTIONS = ['layout-wrap', 'layout-nowrap', 'layout-fill', 'layout-margin', 'layout-padding'];
const LAYOUT_WITH_OPTIONS = ['layout', 'layout-xs', 'layout-gt-xs', 'layout-sm', 'layout-gt-sm', 'layout-md', 'layout-gt-md', 'layout-lg', 'layout-gt-lg', 'layout-xl', 'layout-align'];
const ALIGNMENT_MAIN_AXIS = ["", "start", "center", "end", "stretch", "space-around", "space-between"];
const ALIGNMENT_CROSS_AXIS = ["", "start", "center", "end", "stretch"];

/*

[layout] provides sugar to enable developers to more easily create modern, responsive layouts on top of CSS3 flexbox.

The layout API consists of a set of Angular directives that can be applied to any of your application's HTML content.

*/

@Directive({
  selector: '[layout]'
})
export class Layout {

  constructor(private el: ElementRef, private renderer: Renderer, private Logger: Logger) { }

  ngOnInit() {
    let element = this.el.nativeElement;
    // define a string array that will hold all the classes twhich we'll added to the element's class list
    let classes: string[] = ['layout']; // will add the 'layout' class to the host element no matter what

    // loop through our defined layout attributes that HAVE a value
    // and check if they're present on the element
    LAYOUT_WITHOUT_OPTIONS.forEach((ATTR) => {
      // if attribute exists send it's name to the classes array
      if (element.hasAttribute(ATTR)) {
        classes.push(ATTR);
      }
    });

    // loop through our defined layout attributes that DON'T HAVE a value
    // and check if they're present on the element
    LAYOUT_WITH_OPTIONS.forEach((ATTR) => {
      if (element.hasAttribute(ATTR)) { //if attribute exists
        let val: string = element.getAttribute(ATTR) + ''; // store it's value for use, as a string, it will return an empty string if not present

        // if the attribute isn't the 'layout-align' attribute (meaning it's 'layout' or one of it's breakpoint specific variants)
        if (ATTR !== 'layout-align' ) {
          if (val !== '' && LAYOUT_OPTIONS.indexOf(val) > -1) { // check if the value is either 'row' or 'column'
            classes.push(`${ATTR}-${val}`); // if true, add the 'layout-' prefix and send it to the classes array
          } else if(val === ''){ // check if there's no value for the attribute
              classes.push(`layout-wrap`); // if true, add the 'layout-' prefix and send it to the classes array
          } else { // if not, inform the user about it's options
            this.Logger.warn(`The value ${val} is not a valid option for the layout flow. It must be either 'row ' for horizontal flow, or 'column' for vertical flow`);
          }
        } else { // if the attribute IS 'layout-align'
          // sanitize the value and create an array to specify values for both alignment axes
          let axes: string[] = val.replace(WHITESPACE, '-').split('-');
          (ALIGNMENT_MAIN_AXIS.indexOf(axes[0]) > -1) // if the declared MAIN AXIS is valid, go ahead
            ?
            (ALIGNMENT_CROSS_AXIS.indexOf(axes[1]) > -1) //if the declared CROSS AXIS is valid as well..
              ?
              // replace the value's whitespace with '-' and add it to the classes array
              classes.push(`${ATTR}-${val.replace(WHITESPACE, '-') }`)
              :
              // if the declared CROSS AXIS is not valid, warn the user about it
              this.Logger.warn(`The value ${axes[1]} is not a valid option for the cross axis alignment. Please check the documentation for a list of available options`)
            :// if the declared MAIN AXIS is not valid either, warn the user about it and do nothing
            this.Logger.warn(`The value ${axes[0]} is not a valid option for the main axis alignment. Please check the documentation for a list of available options`);
        }
      }
    });

    // push all our processed class names from the 'classes' aray to the element's class list
    classes.forEach((cls) => this.renderer.setElementClass(this.el, cls, true));
  }
}

/*

[flex] gives the ability to customize the size and position of elements in a layout container, use the flex, flex-order, and flex-offset attributes on the container's child elements

*/


@Directive({
  selector: '[flex]'
})
export class Flex {

  constructor(private el: ElementRef, private renderer: Renderer, private Logger: Logger) { }

  ngOnInit() {
    let element = this.el.nativeElement;
    let classes: string[] = ['flex']; // will add the 'flex' class to the host element no matter what

    // loop through our defined flex attributes
    // and check if they're present on the element
    FLEX_WITH_VALUES.forEach((ATTR) => {
      if (element.hasAttribute(ATTR)) { //if attribute exists
        let val: string = element.getAttribute(ATTR) + ''; // store it's value for use, as a string

        // if the attribute isn't the 'flex-offset' nor the 'flex-order' attribute (meaning it's 'flex' or one of it's breakpoint specific variants)
        if (ATTR.indexOf('flex-offset') === -1 && ATTR.indexOf('flex-order') === -1) {
          // check if the value is part of the FLEX_OPTIONS (eg. 'grow', 'initiol' etc.)
          // if true, add the 'flex-' prefix and send it to the classes array
          (FLEX_OPTIONS.indexOf(val) > -1) ? classes.push(`${ATTR}-${val}`) :
            // if not, check if the value is not an empty string and if it's a size percentage (eg. '20', '50' etc.)
            // if true, add the 'flex-' prefix and send it to the classes array
            (val !== '' && FLEX_VALUES.indexOf(val) > -1) ? classes.push(`${ATTR}-${val}`) :
              // if not, just push 'flex' to the classes array
              (classes.push('flex'))
        } else if (ATTR.indexOf('flex-offset') > -1 && ATTR.indexOf('flex-order') === -1) {
          // if the attribute IS the 'flex-offset' or one of it's breakpoint specific variants
          // check if the value is not an empty string and if it's a size percentage (eg. '20', '50' etc.)
          // if true, add the 'flex-offset-' prefix and send it to the classes array
          (val !== '' && FLEX_VALUES.indexOf(val) > -1) ? classes.push(`${ATTR}-${val}`) :
            (classes.push('flex-offset')) // if not, just push 'flex-offset' to the classes array
        } else if (ATTR.indexOf('flex-order') > -1) {
          // if the attribute IS the 'flex-order' or one of it's breakpoint specific variants
          // parse it's value if it's valid or pass it as a empty string if it's not
          // not giving it a type, we still need to check if the value exists as a string and it's not empty
          let count = parseFloat(val) || val + '';
          // check if the value's parsed integer is greater than or equal to -20 and less than or equal to 20
          // if true, add the 'flex-order-' prefix and send it to the classes array
          (count !== '' && count >= -20 && count <= 20) ? classes.push(`${ATTR}-${val}`) :
            // if not and doesnt fall between the above values, warn the user that it should..
            (count !== '' && (count < -20 || count > 20)) ? this.Logger.warn(`The value ${count} is not a valid option for the flex order. It must be a value between -20 and 20`) :
            // if the above conditions are both false, means the value is just and empty string
            (classes.push('flex-order'))
        }
      };
    });

    // push all our processed class names from the 'classes' aray to the element's class list
    classes.forEach((cls) => this.renderer.setElementClass(this.el, cls, true));
  }
}

export const LAYOUT_DIRECTIVES: Type[] = CONST_EXPR([Layout, Flex]);
