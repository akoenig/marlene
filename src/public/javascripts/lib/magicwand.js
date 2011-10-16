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
//     DOCME
//
// description:
//     DOCME
//
define([
    'app/helpers/logger',
    'vendor/raphael',
    'vendor/framework'
],
function(logger) {

    var _name = 'MagicWand';

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    function MagicWand(options) {
        logger.log(_name, 'Creating a new MagicWand ...');

        options = options || {};

        this.poster = options.poster;
        this.user = options.user;

        // Check if the data for the poster is available
        // which should be created.
        if (!this.poster) {
            logger.error(_name, 'Please define the poster data in order to use the MagicWand ...');
        }

        if (!this.user) {
            logger.error(_name, 'Please define a user in order to use the MagicWand ...');
        }
    }

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.waggle = function() {
        logger.log(_name, 'Waggling the MagicWand ...');
        logger.log(_name, this.user.toJSON());
        logger.log(_name, this.poster.toJSON());

        logger.log(_name, "10 seconds left ...");
        var context = this;

        window.setTimeout(function() {
            context.poster.set({
                produced: true
            });
        }, 10000);
    };

    return MagicWand;
});