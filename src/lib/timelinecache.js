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

var TimelineCache = function(lifetime, logger) {
    var context = this;

    this.logger = logger;

    context.logger.log('TimelineCache: Creating cache (lifetime='+lifetime+'ms).');

    this.timelines = [];

    this.locked = false;

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    var punisher = setInterval(function() {
        if (!context.locked) {
            context.logger.log('TimelineCache: ## CLEARING THE CACHE ##');
            context.timelines = [];
        } else {
            context.logger.log('TimelineCache: ## CACHE IS LOCKED - WILL NOT CLEAR THE CACHE ##');
        }
    }, lifetime);

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    this.lookupUser = function(id) {
        var user;

        var timeline = _.filter(this.timelines, function(timeline) {
            return (timeline.user.id === id);
        })[0];

        if (timeline) {
            user = timeline.user;
        }

        return user;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    this.lookupPage = function(user, pagenumber) {
        var page;

        var timeline = _.filter(this.timelines, function(timeline) {
            return (timeline.user.id === user.id);
        })[0];

        if (timeline) {
            page = _.filter(timeline.pages, function(p) {
                return (p.no === pagenumber);
            })[0];
        }

        return page;
    };
};

//
// summary:
//     DOCME
//
// description:
//     DOCME
//
TimelineCache.prototype.add = function(user, page) {
    var context = this;

    var timeline = _.filter(this.timelines, function(timeline) {
        return (timeline.user.id === user.id);
    })[0];

    if (!timeline) {
        timeline = {
            user: user,
            pages: []
        };

        this.timelines.push(timeline);
    }

    if (page && page.tweets.length) {
        timeline.pages.push(page);
    }

    context.logger.log("TimelineCache: Cached timelines " + context.timelines.length);
    context.logger.log("TimelineCache: Current inspected timeline from '@" + timeline.user.nick + "' has " + timeline.pages.length + " cached page(s).");


    console.log(this.timelines);
};

//
// summary:
//     DOCME
//
// description:
//     DOCME
//
TimelineCache.prototype.lookup = function(user, pagenumber) {
    var context = this;
    var result;

    if (typeof user === 'number') {
        result = context.lookupUser(user);
    } else {
        result = context.lookupPage(user, pagenumber);
    }

    return result;
};

//
// summary:
//     DOCME
//
// description:
//     DOCME
//
TimelineCache.prototype.lock = function() {
    this.locked = true;
};

//
// summary:
//     DOCME
//
// description:
//     DOCME
//
TimelineCache.prototype.unlock = function() {
    this.locked = false;
};

module.exports = TimelineCache;