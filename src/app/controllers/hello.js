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
exports.HelloController = function(app, mw, logger) {

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/', function(res, req) {
        req.redirect('/hello');
    });

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/hello', function(req, res) {
        logger.log('Called the index route ...');

        res.render('hello/index', {
            title: res.lingua.content.pages.hello.title
        });
    });

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/app', mw.auth.loginrequired, function(req, res) {
        logger.log('@' + req.user.nick + " signed in. Delivering the app ...");

        res.render('app/index', {
            title: res.lingua.content.pages.app.title
        });
    });
};