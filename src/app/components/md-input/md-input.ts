import {Component, ElementRef, Renderer, Input} from 'angular2/core';


@Component({
  selector: 'md-input',
  templateUrl: 'app/components/md-input/md-input.html',
  styleUrls: ['app/components/md-input/md-input.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class MdInput {

  constructor(private el: ElementRef, private renderer: Renderer) {
      renderer.setElementClass(el, 'md-input', true);
      console.log(el.nativeElement.querySelector('input'));
  }

}
