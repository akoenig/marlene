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
module.exports = function() {

    return {

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        loginrequired : function(req, res, next) {
            var loggedin = req.loggedIn;

            if (!loggedin) {
                res.redirect('/auth/twitter');
            } else {
                var auth = req.session.auth;

                if (auth) {
                    var credentials = auth.twitter;

                    if (credentials) {
                        var user = {
                            id: credentials.user.id,
                            nick: credentials.user.screen_name,
                            accessToken: credentials.accessToken,
                            accessTokenSecret: credentials.accessTokenSecret
                        };

                        req.user = user;
                    }
                }
                next();
            }
        }
    };
};