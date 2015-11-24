/* eslint-env jasmine */

import './gecko-o-meter';

describe('hello', () => {
  it('should', () => {
    expect(1).toBe(1);
    window.testMethod('testing123');
    expect('testing123').toBe(window.getT());
  });
});
