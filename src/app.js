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
    lingua     = require('./lib/lingua'),
    logger     = require('./lib/logger').logger(config.loggly, true),
    users      = require('./lib/users').users(config, logger),
    Promise    = everyauth.Promise;

var app = module.exports = express.createServer();

//
// Extending the external with the internal configuration.
//
config = _.extend(config, {
    meta: {
        name: 'marlene',
        version: '0.1-20110924'
    },
    directories: {
        app: __dirname + '/app',
        controllers: __dirname + '/app/controllers'
    }
});

//
// Twitter OAuth configuration
//
everyauth.twitter
    .consumerKey(config.oauth.key)
    .consumerSecret(config.oauth.secret)
    .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
        var promise = new Promise();

        config.oauth.accessToken = accessToken;
        config.oauth.accessTokenSecret = accessTokenSecret;

        users.findOrCreateByTwitterData(twitterUserData, accessToken, accessTokenSecret, promise);

        return promise;
    })
    .redirectPath('/app');

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
        defaultLocale: 'de-de'
    }));

    app.use(express.session({
        secret: 'secret',
        key: 'express.sid'
    }));

    app.use(everyauth.middleware());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    everyauth.helpExpress(app);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

//
// Init the controllers
//
require(config.directories.controllers)(app, logger);

//
// Starting listening mechanism.
//
if (!module.parent) {
    app.listen(app.set('config').server.port);
    console.log("'" + config.meta.name + "' listening on port %d", app.address().port);
}