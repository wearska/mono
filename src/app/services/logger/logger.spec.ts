import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Logger} from './logger';


describe('Logger Service', () => {

  beforeEachProviders(() => [Logger]);


  it('should ...', inject([Logger], (service:Logger) => {

  }));

});
