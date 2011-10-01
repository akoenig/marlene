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
var cradle = require('cradle');

exports.users = function(config, logger) {
    var connection = new (cradle.Connection)(config.database.host, config.database.port, {
        auth: {
            username: config.database.username,
            password: config.database.password
        }
    });

    var c = connection.database(config.database.name);

    return {

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        findById : function(id, callback) {
            c.view('docs/twitterId', function(err, docs) {
                docs.forEach(function(doc) {
                    if (doc.twitterId.toString() === id) {
                        callback(null, doc);
                    }
                });
            });
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        findOrCreateByTwitterData: function(twitterUserData, accessToken, accessTokenSecret, promise) {
              c.view('docs/twitterId', function(err, docs) {
                if (err) {
                      promise.fail(err);
                      return;
                }

                var exists = false;

                docs.forEach(function(doc) {
                    if (doc.twitterId.toString() === twitterUserData.id_str) {
                        exists = true;
                    }
                });

                if (exists) {
                    var user = docs[0].value;

                    promise.fulfill(user);

                } else {

                      var doc = {
                        accessToken: accessToken,
                        accessTokenSecret: accessTokenSecret,
                        name: twitterUserData.name,
                        screen_name: twitterUserData.screen_name,
                        description: twitterUserData.description,
                        location: twitterUserData.location,
                        twitterId: twitterUserData.id
                      };

                      c.save(doc, function(err, res) {
                        if (err) {
                              logger.log('Module: users - Error while using user: ' +JSON.stringify(err));
                              promise.fail(err);
                              return;
                        }

                        logger.log('Module: users - Created user: ' + JSON.stringify(doc));

                        promise.fulfill(doc);
                      });
                }
              });
          }
    };
};