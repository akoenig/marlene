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
define([
    'app/models/tweet',
    'lib/framework'
],
function(Tweet) {

    var _name = 'TweetList';

    var TweetList = Backbone.Collection.extend({

        //
        // DOCME
        //
        model: Tweet,

        //
        // DOCME
        //
        url: '/twitter/timeline/page/',

        //
        // DOCME
        //
        page: 1,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        next : function() {
            var context = this;

            var deferred = $.Deferred();

            var tweets = [];

            context.fetch({
                url: context.url + context.page,
                success : function(me, answer) {
                    var data = JSON.parse(answer.data);
                    
                    // TODO: Handle exceptions!!
                    _.each(data.tweets, function(tweetData) {
                        var tweet = new Tweet(tweetData);
                        tweets.push(tweet);
                    });

                    context.page++;

                    context.add(tweets);

                    deferred.resolve(tweets);
                },
                add: true
            });

            return deferred.promise();
        }
    });

    return TweetList;
});