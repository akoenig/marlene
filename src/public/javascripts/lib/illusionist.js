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
    'lib/magicwand',
    'app/helpers/logger',
    'vendor/framework'
],
function(MagicWand, logger) {

    var _name = 'Illusionist';

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    function Illusionist(options) {
        logger.log(_name, 'Creating a new Illusionist ...');

        options = options || {};

        this.poster = options.poster;
        this.user = options.user;

        // Check if the data for the poster is available
        // which should be created.
        if (!this.poster) {
            logger.error(_name, 'Please define the poster data in order to use the Illusionist ...');
        }

        if (!this.user) {
            logger.error(_name, 'Please define a user in order to use the Illusionist ...');
        }
    }

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Illusionist.prototype.perform = function() {
        logger.log(_name, 'performing ...');
        var context = this;
        
        Step(
            function generate() {
                new MagicWand(context.model)
                    .createPaper()
                    .createBackground()
                    .createPhotoDrops()
                    .createProfileDrop()
                    .createTweetDrop()
                    .createSemanticDrops()
                    .finish(this);
            },
            function finalize(canvas) {
                logger.log(_name, 'finished performing ...');

                context.poster.set({
                    canvas: canvas,
                    produced: true
                });
            }
        );
    };

    return Illusionist;
});