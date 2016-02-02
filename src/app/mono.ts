import {Component} from 'angular2/core';
import {LAYOUT_DIRECTIVES} from './directives/layout/layout';
import {Logger} from './services/logger/logger';
import {MdInput} from './components/md-input/md-input';


@Component({
  selector: 'mono-app',
  providers: [Logger],
  templateUrl: 'app/mono.html',
  directives: [LAYOUT_DIRECTIVES, MdInput],
  pipes: []
})
export class MonoApp {
  defaultMeaning: number = 42;

  constructor () {

  }

  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
