// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context('../../app/scripts', true, /.spec$/);
testsContext.keys().forEach(testsContext);
