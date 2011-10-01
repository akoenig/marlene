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

var _ = require('underscore');

var TwitterAPI = require('twitter');
var TimelineCache = require('./timelinecache');

module.exports = function(config, logger) {

    //
    // Init the tweet cache.
    //
    var cache = new TimelineCache(config.cachelifetime, logger);

    //
    // DOCME
    //
    config.fetchcount = 200;

    //
    // DOCME
    //
    var Twitter = function(user) {
        var context = this;

        this.user = user;

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        this._createFetcher = function() {
            return new TwitterAPI({
                consumer_key: config.oauth.key,
                consumer_secret: config.oauth.secret,
                access_token_key: context.user.accessToken,
                access_token_secret: context.user.accessTokenSecret
            });
        };
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Twitter.prototype.getMeta = function(callback) {
        var context = this;

        var user = cache.lookup(this.user.id);

        if (!user) {
            logger.log('Twitter: Fetching the user data from the API.');

            var fetcher = context._createFetcher();

            // Before we fetch the new data, we have to lock the cache
            // so that the 'punisher process' won't clear it until
            // some fresh data has arrived.
            cache.lock();

            fetcher.lookupUser(this.user.id, function(data) {   
                var userdata = {
                    avatar: data.profile_image_url,
                    description: data.description,
                    followers: data.followers_count,
                    language: data.language,
                    location: data.location,
                    name: data.name,
                    nick: data.screen_name,
                    statuscount: data.statuses_count,
                    pages: (function() {
                        var rounded = Math.round(data.statuses_count / config.fetchcount);
                        return (rounded === 0) ? 1 : rounded;
                    }())
                };

                context.user = _.extend(context.user, userdata);
                cache.add(context.user);

                callback(context.user);

                cache.unlock();
            });
        } else {
            logger.log('Twitter: Getting the user data from the cache.');

            callback(user);
        }
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Twitter.prototype.getTimeline = function(pagenumber, callback) {
        var context = this;

        var page = cache.lookup(this.user, pagenumber);

        if (!page) {
            logger.log("Twitter: Page was NOT in the cache ... Fetching it from the API.");
            var fetcher = context._createFetcher();

            // Before we fetch the new data, we have to lock the cache
            // so that the 'punisher process' won't clear it until
            // some fresh data has arrived.
            cache.lock();

            fetcher.getUserTimeline({
                count: config.timeline.fetchcount,
                exclude_replies: (config.timeline.exclude.replies) ? true : false,
                include_rts: (config.timeline.exclude.retweets) ? false : true,
                include_entities: false,
                page: pagenumber
            }, function(rawTweets) {
                var tweets = [];

                if (rawTweets.statusCode) {
                    var error = rawTweets;

                    callback({
                        code: error.statusCode,
                        message: error.message
                    });
                } else {
                    rawTweets.forEach(function(rawTweet) {
                        var tweet = (function() {
                            return {
                                id: rawTweet.id_str,
                                text: rawTweet.text,
                                created: rawTweet.created_at
                            };
                        }());

                        tweets.push(tweet);
                    });

                    var page = {
                        no: pagenumber,
                        tweets: tweets
                    };

                    cache.add(context.user, page);

                    callback(null, page);

                    cache.unlock();
                }
            });
        } else {
            logger.log("Twitter: The page was in the cache ...");

            callback(null, page);
        }
    };

    return Twitter;
};