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
    'vendor/tpl!app/views/ron.tpl',
    'vendor/i18n!app/nls/ron',
    'app/helpers/logger',
    'vendor/framework'
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
        nodes: {
            root: null,
            spinnerTarget: '#ron .spinner',
            tweetList: '#ron .tweets ul'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        css: {
            classes: {
                selected: 'selected'
            }
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        spinner: new Spinner({
            lines: 6, // The number of lines to draw
            length: 2, // The length of each line
            width: 2, // The line thickness
            radius: 5, // The radius of the inner circle
            color: '#000', // #rgb or #rrggbb
            speed: 1.1, // Rounds per second
            trail: 50, // Afterglow percentage
            shadow: false // Whether to render a shadow
        }).spin(),

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        // TODO: Move this into a separate file (maybe).
        templates: {
            tweetListEntry: '<% _.each(tweets, function(tweet) { %> <li id="t<%= tweet.id %>"><%= tweet.text %></li> <% }); %>'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        events: {
            'click .tweets .more': 'more',
            'click .tweets li': 'select'
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
        tweets: null,

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

            // Init the loading spinner
            this.$spinnerTarget.append(this.spinner.el);

            //
            // Load the first page.
            //
            this.more();
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
            var context = this;

            this.nodes.root = $(template({
                i18n: i18n    
            }));

            this.tweets = new TweetList();

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
        more : function(e) {
            var context = this;

            if (e) {
                e.preventDefault();
            }

            var deferred = $.Deferred();

            if (context.page < this.user.get('pages')) {
                Step(
                    function load() {
                        context.$spinnerTarget.fadeIn();
                        context.tweets.next().then(this);
                    },
                    function render(tweets) {
                        context.$spinnerTarget.hide();
                        tweets = new TweetList(tweets);

                        var templates = $(_.template(context.templates.tweetListEntry, {tweets : tweets.toJSON()}));
                        context.$tweetList.append(templates);

                        context.page++;

                        deferred.resolve();
                    }
                );
            } else {
                deferred.resolve();
            }

            return deferred.promise();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        select : function(e) {
            var context = this;

            var tweetListEntry = $(e.currentTarget);
            this.$tweetList.children().removeClass(this.css.classes.selected);
            tweetListEntry.addClass(this.css.classes.selected);

            // Determine the tweet id.
            var id = $(e.currentTarget).attr('id');
            id = id.replace(id.charAt(0), '');

            var tweet = _.select(context.tweets.models, function(candidate) {
                return (candidate.get('id') === id );
            })[0];

            context.model.set({
                tweet: tweet
            });

            this.trigger('unlocked');
        }
    });

    return RonView;
});