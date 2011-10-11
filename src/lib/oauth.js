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
var everyauth = require('everyauth');

module.exports = function(config, logger) {

    var users = require('./users').users(config, logger);

    return {

    	//
    	// summary:
    	//     DOCME
    	//
    	// description:
    	//     DOCME
    	//
    	init : function(redirectUrl) {

            everyauth
                .twitter
                .consumerKey(config.twitter.oauth.key)
                .consumerSecret(config.twitter.oauth.secret)
                .authorizeParams({force_login: true})
                .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
                    var promise = this.Promise();

                    users.findOrCreateByTwitterData(twitterUserData, accessToken, accessTokenSecret, promise);

                    return promise;
            })
            .redirectPath(redirectUrl);
    	}
    };
};