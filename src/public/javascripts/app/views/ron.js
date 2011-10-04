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
    'lib/tpl!app/views/ron.tpl',
    'lib/i18n!app/nls/ron',
    'app/helpers/logger',
    'lib/framework'
],
function(TweetList, template, i18n, logger) {
    
    var _name = 'RonView';

    var RonView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        node: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        events: {
            'click .tweets .more': 'more'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        user: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        page: 0,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
            logger.log(_name, 'initialize ...');

            this.user = this.options.user;

            this.render();
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

            context.node.fadeOut('slow', function() {
                context.node.remove();

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
            this.node = $(template());

            this.el.empty().append(this.node);
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        more : function(e) {
            if (e) {
                e.preventDefault();
            }

            var context = this;

            this.page++;

            if (this.page <= this.user.get('pages')) {
                var tweets = new TweetList();

                Step(
                    function load() {
                        tweets.grab(context.page).then(this);
                    },
                    function render(tweets) {
                        console.log(tweets.toJSON());
                        var list = "<% _.each(tweets, function(tweet) { %> <li><%= tweet.text %></li> <% }); %>";
                        var templates = $(_.template(list, {tweets : tweets.toJSON()}));
                        context.$('ul').append(templates);
                    }
                );
            }
        }
    });

    return RonView;
});