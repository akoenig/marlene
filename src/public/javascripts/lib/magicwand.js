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
    'app/helpers/randomizer',
    'lib/assets',
    'vendor/raphael',
    'vendor/framework'
],
function(logger, randomizer, assets) {

    var _name = 'MagicWand';

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    function MagicWand(poster, user) {
        this.poster = poster;
        this.user = user;
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

        //
        // Grabbing the format ...
        //
        var isLandscape = (this.poster.get('landscape') === true);
        var format = (isLandscape) ? assets.formats.landscape : assets.formats.portrait;

        // TODO: Fix the dimension bug here ...
        this.paper = Raphael($('<section />'), format.width, format.height);

        this.canvas = $(this.paper.canvas);
        this.canvas.attr({
            height: format.height,
            width: format.width
        });

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
            var colors = ['red', 'blue', 'green', 'yellow', 'pink', 'black', 'white'];

            var x = randomizer.digit({
                max: (colors.length - 1)
            });

            var color = colors[x];

var circle = this.paper.circle(50, 40, 10);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", color);

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff");


        // TODO: Add background

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

        callback(this.canvas);
    };

    return MagicWand;
});