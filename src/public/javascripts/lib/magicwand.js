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

/*

                new MagicWand(context.model)
                    .createSemanticDrops();
                    .finish(this);
*/



    function MagicWand() {
    }

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createPaper = function() {
        logger.log(_name, 'createPaper()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createBackground = function() {
        logger.log(_name, 'createBackground()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createPhotoDrops = function() {
        logger.log(_name, 'createPhotoDrops()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createProfileDrop = function() {
        logger.log(_name, 'createProfileDrop()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createTweetDrop = function() {
        logger.log(_name, 'createTweetDrop()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createSemanticDrops = function() {
        logger.log(_name, 'createSemanticDrops()');

        return this;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.finish = function(callback) {
        logger.log(_name, 'finish()');

        callback();
    };

    return MagicWand;
});