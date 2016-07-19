var debug = require('debug')('passport-mongo');
var app = require('./app');


app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.render("index");
});

app.listen(app.get("port"), function() {
    process.on('uncaughtException', function (err) {
        console.log(err);
    });
  console.log("Express server listening on port %d in %s mode", app.get("port"), app.settings.env);
});


var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
