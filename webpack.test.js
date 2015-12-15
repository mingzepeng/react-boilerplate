// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require("babel-polyfill");

var context = require.context('./test', true, /.+\.js$/);
context.keys().forEach(context);