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

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    var _createAnswer = function() {
        return {
            success: true,
            code: 200,
            message: null,
            data: null
        };
    };

    return {
        
        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        call : function(req, res, next) {
            res.answer = _createAnswer();

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
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        loginrequired : function(req, res, next) {
            if (!res.answer) {
                res.answer = _createAnswer();
            }

            var loggedin = req.loggedIn;

            if (!loggedin) {
                res.answer.success = false;
                res.answer.code = 401;
                res.answer.message = res.lingua.content.rest.errors.loginrequired;

                res.send(JSON.stringify(res.answer), res.answer.code);
            } else {
                next();
            }
        }

    };
};