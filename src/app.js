/*
 * marlene
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011
 *
 * André König (andre.koenig -[at]- gmail [*dot*] com)
 * Judith Ngo (jud.ngo -[at]- gmail [*dot*] com)
 *
 */

//
// Dependencies / Libraries
//
var _          = require('underscore'),
    express    = require('express'),
    everyauth  = require('everyauth'),
    config     = require('./lib/config').gulp,
    lingua     = require('lingua'),
    logger     = require('./lib/logger').logger(config.loggly, true),
    oauth      = require('./lib/oauth')(config, logger);

// DOCME
var app = module.exports = express.createServer();

//
// Extending the external with the internal configuration.
//
config = _.extend(config, {
    meta: {
        name: 'marlene',
        version: '0.0.2-20111001'
    },
    i18n: {
        defaultLocale: 'de-de'
    },
    directories: {
        app: __dirname + '/app',
        controllers: __dirname + '/app/controllers',
        middleware: __dirname + '/app/middleware',
        lib: __dirname + '/lib',
        i18n: __dirname + '/i18n'
    }
});

//
// Init the Twitter OAuth layer and pass the url which
// will be called after the user signed in via Twitter.
//
oauth.init('/app');

//
// Configuration
//
app.configure(function() {
    app.set('config', config);
    app.register(".html", require("jqtpl").express);
    app.set('views', config.directories.app + '/views');
    app.set("view engine", "html");

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(lingua(app, {
        defaultLocale: config.i18n.defaultLocale,
        path: config.directories.i18n
    }));
    app.use(express.session({
        secret: 'secret'
    }));
    app.use(express.static(__dirname + '/public'));
    app.use(everyauth.middleware());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

//
// Init the middleware
//
var middleware = require(config.directories.middleware)(logger);

//
// Init the controllers
//
require(config.directories.controllers)(app, middleware, logger);

//
// Starting listening mechanism.
//
var port = process.env.PORT || app.set('config').server.port;

if (!module.parent) {
    app.listen(port);
    console.log("'" + config.meta.name + "' listening on port %d", app.address().port);
}

