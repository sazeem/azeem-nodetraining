import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';

fdescribe('Hello Test', () => {
  let expected = '';
  let notExpected = '';

  beforeEach(() => {
    expected = 'Hello World';
    notExpected = 'Hello world';
  })

  afterEach(() => {
    expected = '';
    notExpected = '';
  })

  it('Checks if Hello World is Hello World', ()=>{
    expect('Hello World').toBe(expected);
  });
  
  it('Checks if Hello World is not Hello world', ()=>{
    expect('Hello World').not.toBe(notExpected);
  });
  
})