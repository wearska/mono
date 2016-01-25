import {Component} from 'angular2/core';


@Component({
  selector: 'mono-app',
  providers: [],
  templateUrl: 'app/mono.html',
  directives: [],
  pipes: []
})
export class MonoApp {
  defaultMeaning: number = 42;
  
  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
