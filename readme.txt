override ./bin/www

var app = require('../index');  <=!!!

dont forget in index.js export the app!!!

//	app.listen(...)
module.exports = app;

