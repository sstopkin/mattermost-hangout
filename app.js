const express = require('express');
const exphbs = require('express-handlebars');
const log = require('./app/lib/log.js');

const app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'layout',
	layoutsDir: __dirname + '/app/views/layout'
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/app/public'));

require(__dirname + '/app/routes')(app);

log.debug("Auth.js is located at " + require('./app/lib/config.js').getAuthPath());
log.debug("MM hostname is: " + process.env.HOSTNAME)
log.debug("IP white list: " + process.env.IP_WHITE_LIST)

const port = Number(process.env.PORT || 5000);
app.listen(port, function () {
	log.info('Listening on ' + port);
});
