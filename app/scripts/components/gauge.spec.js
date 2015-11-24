/* eslint-env jasmine, browser */

import chart from './gauge';
import Bacon from 'baconjs';
import $ from 'jquery';
import R from 'ramda';

describe('gauge', () => {
  it('displays key figures', () => {
    var div = document.createElement('div');
    var data = {
      value: 34,
      min: 0,
      max: 200,
      prefix: '£'
    };

    chart(div, Bacon.constant(data));

    expect($('.gecko-o-meter--value', div).text()).toBe(data.prefix + data.value);
  });

  it('updates as values in the stream update', () => {
    var div = document.createElement('div');
    var data1 = {
      value: 34,
      min: 0,
      max: 200,
      prefix: '£'
    };
    var data2 = R.assoc('value', 50, data1);

    var stream = new Bacon.Bus();

    chart(div, stream);

    stream.push(data1);
    expect($('.gecko-o-meter--value', div).text()).toBe(data1.prefix + data1.value);

    stream.push(data2);
    expect($('.gecko-o-meter--value', div).text()).toBe(data2.prefix + data2.value);
  });
});
