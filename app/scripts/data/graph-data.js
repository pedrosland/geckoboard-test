import Bacon from 'baconjs';

// Sample data
export default Bacon.later(500, {
  value: 34,
  min: 0,
  max: 200,
  format: 'currency',
  unit: 'GBP'
});
