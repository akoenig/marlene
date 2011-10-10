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

var Step = require('step');

exports.TwitterController = function(app, mw, logger) {

    //
    // DOCME
    //
    var appconfig = app.set('config');
    var config = appconfig.twitter;

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

        //
        // The "meta data loading" is necessary because of the cache garbage collection.
        // If the user will call this route while the cache was cleared all twitter user
        // information will be not available anymore. So we have to ensure their existence.
        //
        Step(
            function meta() {
                twitter.getMeta(this); // Here we cache the twitter user information if the were removed.
            },
            function timeline(user) {
                var page = {
                    no: pagenumber,
                    tweets: []
                };

                var answer = res.answer;

                // Check if the user owns the requested page. If not we
                // have to avoid a useless API request (Issue #1).
                if (pagenumber <= user.pages) {
                    twitter.getTimeline(pagenumber, function(error, timeline) {                    

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
                } else {
                    answer.success = true;
                    answer.data = JSON.stringify(page);

                    res.send(JSON.stringify(answer), answer.code);
                }
            }
        );
    });
};