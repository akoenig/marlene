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
exports.TwitterController = function(app, mw, logger) {
var user = {
  id: 14131939,
  accessToken: '14131939-8UCoV8LfaysFwLpqscWIYZ0znSsa0dUMK5CgIRUxb',
  accessTokenSecret: 'lfzKo0zBGvgluSzvX5nYNag6hrAmyvHPsTNy6gJYXE'
};

    //
    // DOCME
    //
    var appconfig = app.set('config');
    var config = appconfig.twitter;

    config.timeline.fetchcount = 200; // Twitter-API max.

    var Twitter = require(appconfig.directories.lib + '/twitter')(config, logger);

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/twitter/meta', mw.rest.call, mw.rest.loginrequired, function(rew, res) {
        var twitter = new Twitter(user);

        twitter.getMeta(function(meta) {
            var answer = res.answer;
            answer.data = JSON.stringify(meta);

            res.send(JSON.stringify(answer), answer.code);
        });
    });

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/twitter/timeline', mw.rest.call, mw.rest.loginrequired, function(req, res) {
        res.redirect('/twitter/timeline/1');
    });

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/twitter/timeline/:pagenumber', mw.rest.call, mw.rest.loginrequired, function(req, res) {
        // TODO: Insert user object.
        var twitter = new Twitter(user);

        var pagenumber = req.params.pagenumber;

        twitter.getTimeline(pagenumber, function(error, page) {
            var answer = res.answer;

            if (!error) {
                answer.success = true;
                answer.data = JSON.stringify(page.tweets);
            } else {
                console.log(error);
                answer.success = false;
                answer.code = error.code;
                answer.message = error.message;
            }

            res.send(JSON.stringify(answer), answer.code);
        });
    });
};