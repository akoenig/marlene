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

//
// summary:
//     The firefighter helper.
//
// description:
//     The firefighter handles exceptions from the application.
//
define([
    'app/config',
    'app/helpers/logger',
    'vendor/framework'
],
function(config, logger) {

    var _name = 'Firefighter';

    return {

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        alarm : function() {
            logger.log(_name, 'boot ...');

            config.nodes.loading
                .ajaxStart(function() {
                    var node = $(this);
                    node.fadeIn();
                })
                .ajaxError(function(e, jqxhr, settings, exception) {
                    var node = $(this);
                    node.fadeOut();

                    config.nodes.error.html(exception).fadeIn();
                })
                .ajaxSuccess(function() {
                    var node = $(this);
                    node.fadeOut();
                });
        }
    };
});