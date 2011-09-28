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
    app.get('/twitter/meta', mw.rest.call, mw.rest.loginrequired, function(req, res) {
        var twitter = new Twitter(req.user);

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
        res.redirect('/twitter/timeline/page/1');
    });

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/twitter/timeline/page/:pagenumber', mw.rest.call, mw.rest.loginrequired, function(req, res) {
        var twitter = new Twitter(req.user);

        var pagenumber = req.params.pagenumber;

        twitter.getTimeline(pagenumber, function(error, timeline) {
            var answer = res.answer;

            var page = {
                no: pagenumber,
                tweets: null
            }

            if (!error) {
                answer.success = true;
                page.tweets = timeline.tweets;
                answer.data = JSON.stringify(page);
            } else {
                answer.success = false;
                answer.code = error.code;
                answer.message = error.message;
            }

            res.send(JSON.stringify(answer), answer.code);
        });
    });
};