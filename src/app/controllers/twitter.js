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

var Twitter = require('twitter');

exports.TwitterController = function(app, mw, logger) {

// FOR DEVELOPMENT PURPOSES
var ACCESS_TOKEN = 'lfzKo0zBGvgluSzvX5nYNag6hrAmyvHPsTNy6gJYXE';
var ACCESS_TOKEN_SECRET = 'lfzKo0zBGvgluSzvX5nYNag6hrAmyvHPsTNy6gJYXE';

    //
    // DOCME
    //
    var oauth = app.set('config').oauth;

    //
    // DOCME
    //
    var config = app.set('config').twitter;
    config.fetchcount = 200; // Twitter-API max.

    //
    // summary:
    //     The API client.
    //
    // description:
    //     DOCME
    //
    var _fetcher = function(accessToken, accessTokenSecret) {
    	return new Twitter({
            consumer_key: oauth.key,
            consumer_secret: oauth.secret,
            access_token_key: accessToken,
            access_token_secret: accessTokenSecret
        });
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/twitter/meta', mw.rest.call, mw.rest.loginrequired, function(rew, res) {
        /*
        
            user: name, profileImage, location, follower
            timeline: count, pages
        */
        var meta = {
        	user: {
        		name: null,
        		nick: null,
                location: null,
                follower: 0
        	},
        	timeline: {
        		count: 0,
        		pages: 0 / config.fetchcount
        	}
        };

        var answer = res.answer;
        answer.data = JSON.stringify(data);

        res.send(JSON.stringify(data), answer.code);

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
    app.get('/twitter/timeline/:page', mw.rest.call, mw.rest.loginrequired, function(req, res) {

        var fetcher = _fetcher(ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

        fetcher.getUserTimeline({
        	count: config.fetchcount,
        	exclude_replies: (config.exclude.replies) ? true : false,
        	include_rts: (config.exclude.retweets) ? false : true,
        	include_entities: false,
        	page: req.params.page
        }, function(rawTweets) {

        	var tweets = [];

            rawTweets.forEach(function(rawTweet) {
            	var tweet = function() {
            		return {
            			id: rawTweet.id_str,
            			text: rawTweet.text,
            			created: rawTweet.created_at
            		};
            	}();

            	tweets.push(tweet);
            });

        	var answer = res.answer;

        	answer.success = true;
        	answer.data = JSON.stringify(tweets);

        	res.send(JSON.stringify(answer), answer.code);
        });
    });
};