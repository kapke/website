'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    //dust = require('express-dust-linkedin'),
    dust = require('dustjs-linkedin'),
    helpers = require('dustjs-helpers'),
    consolidate = require('consolidate'),
    url = require('url'),
    controllers = {
        about: require('./controller/about.js'),
        cv: require('./controller/cv.js'),
        portfolio: require('./controller/portfolio'),
        contact: require('./controller/contact.js')
    },
    app = express();

app.set('view engine', 'dust');
app.engine('dust', consolidate.dust);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/static', express.static(__dirname + '/public'));
app.use('/content', express.static(__dirname + '/public/content'));
app.set('views', __dirname+'/public/template');

app.use(function (req, res, next) {
    res.locals.base = url.format({
        protocol: req.protocol,
        hostname: req.hostname,
        port: req.socket.localPort
    });
    next();
});

app.get('/', controllers.about);
app.get('/about', controllers.about);
app.get('/cv', controllers.cv);
app.get('/portfolio', controllers.portfolio.get);
controllers.portfolio.items.forEach(function (item) {
   app.get('/portfolio/'+item.slug, controllers.portfolio.getItem.bind(null, item));
});
app.get('/contact', controllers.contact.get);
app.post('/contact', controllers.contact.post);

var server = app.listen(3000, function () {
	console.log('App listening on port 3000');
});