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
    'app/models/tweetlist',
    'app/helpers/randomizer',
    'vendor/tpl!app/views/draco.tpl',
    'vendor/i18n!app/nls/draco',
    'app/helpers/logger',
    'vendor/framework'
],
function(TweetList, randomizer, template, i18n, logger) {
    
    var _name = 'DracoView';

    var DracoView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        nodes: {
            root: null,
            randomButton: '.retry',
            tweetContent: '.tweet'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        events: {
            'click .retry' : 'retry'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        tweets: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        _lottery : function() {
            var context = this;

            var x = randomizer.digit({
                max: (context.tweets.length - 1)
            });

            var tweet = this.tweets.at(x);

            this.$tweetContent
                .empty()
                .hide()
                .html(tweet.get('text'))
                .fadeIn();

            this.model.set({
                tweet: tweet
            });

            this.trigger('unlocked');
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
            logger.log(_name, 'initialize ...');
            var context = this;

            this.render();

            this.tweets = new TweetList();

            this.tweets.next().then(function(data) {
                context.tweets = new TweetList(data);
                context._lottery();
            });
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        destroy : function() {
            var context = this;

            var deferred = $.Deferred();

            this.nodes.root.fadeOut('slow', function() {
                context.nodes.root.remove();

                deferred.resolve();
            });

            return deferred.promise();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        render : function() {
            this.nodes.root = $(template({
                i18n: i18n
            }));

            this.el.empty().append(this.nodes.root);

            this.addReferences(this.nodes);
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        retry : function(e) {
            if (e) {
                e.preventDefault();
            }

            this._lottery();
        }
    });

    return DracoView;
});