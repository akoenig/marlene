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
    logger.log('TimelineCache: Creating cache (lifetime='+lifetime+'ms).');

	var context = this;

 	this.timelines = [];

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    var punisher = setInterval(function() {
        logger.log('TimelineCache: Clearing the cache ...');

    	context.timelines = [];
    }, lifetime);

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    this.lookupUser = function(id) {
        var user = undefined;

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
        console.log('TimelineCache: Lookup page ...');

        var page = undefined;

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
    console.log("TimelineCache: add()");

	var timeline = _.filter(this.timelines, function(timeline) {
    	return (timeline.user.id === user.id);
    })[0];

    if (!timeline) {
        console.log('TimelineCache: Creating new entry.');
        timeline = {
            user: user,
            pages: []
        };

        this.timelines.push(timeline)
    }

    if (page) {
        timeline.pages.push(page);
    }

    console.log("TimelineCache: -> Content:");
    console.log(this.timelines);
};

//
// summary:
//     DOCME
//
// description:
//     DOCME
/*

 entry = {
    user: user,
    pages: [
        {
            no: null,
            tweets: []
        }
    ]
 }

*/
//
TimelineCache.prototype.lookup = function(user, pagenumber) {
    var context = this;
    var result = undefined;

    if (typeof user === 'number') {
        result = context.lookupUser(user);
    } else {
        result = context.lookupPage(user, pagenumber);
    }

    return result;
};

module.exports = TimelineCache;