
var debug = require('debug')('blueSteel');
var app = require('../app');

app.set('port', process.env.PORT || 8888);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
