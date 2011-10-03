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
    'app/config',
    'app/helpers/logger',
    'lib/framework'
],
function(config, logger) {

    var _name = 'UserModel';

    var User = Backbone.Model.extend({

        url: '/twitter/meta',

        // DOCME
        requestor: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        grab : function(callback) {
            var context = this;

            context.fetch({
                success : function(me, answer) {
                    var data = JSON.parse(answer.data);

                    context.clear().set(data);

                    logger.log(_name, 'Fetched data from logged in user: ' + JSON.stringify(data));

                    if (callback) {
                        callback();
                    }
                }
            });

            if (config.polling.active && !this.requestor) {
                this.requestor = window.setInterval(function() {
                    logger.log(_name, 'Polling - Grabbing new user object from the server.');

                    context.grab();
                }, config.polling.interval);
            }
        }
    });

    return User;
});
