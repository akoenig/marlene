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
        
        var magicwand = new MagicWand(context.poster, context.user);

        Step(
            function paper() {
                magicwand.createPaper(this);
            },
            function photodrops() {
                magicwand.createPhotoDrops(this);
            },
            function createBalls() {
                magicwand.createBalls(this);
            },
            function profiledrop() {
                magicwand.createProfileDrop(this);
            },
            function tweetdrop() {
                magicwand.createTweetDrop(this);
            },
            function semanticdrops() {
                magicwand.createSemanticDrops(this);
            },
            function finish() {
                magicwand.finish(this);
            },
            function end(canvas) {
                context.poster.set({
                    canvas: canvas,
                    produced: true
                });
            }
        );
    };

    return Illusionist;
});