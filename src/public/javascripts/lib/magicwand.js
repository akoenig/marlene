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
    MagicWand.prototype.createPaper = function(callback) {
        logger.log(_name, 'createPaper()');

        //
        // Grabbing the format ...
        //
        var isLandscape = (this.poster.get('landscape') === true);
        var format = (isLandscape) ? assets.formats.landscape : assets.formats.portrait;

        //
        // We have to create a "incubator canvas" in which
        // the complete poster rendering will take place.
        // After the poster creation, we will clone this node
        // remove it from the body and move it into the poster model.
        //
        var incubatorId = ('poster-' + new Date().getTime());
        this.incubator = $('<canvas />');
        this.incubator
            .attr({
                id: incubatorId,
                height: format.height,
                width: format.width
            })
            .hide();

        $('body').append(this.incubator);

        this.paper = (this.incubator.get()[0]).getContext('2d');

        //
        // Draw the marlene logo
        //
        // TODO: Draw the logo.


        callback();
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createBackground = function(callback) {
        logger.log(_name, 'createBackground()');
        var that = this;

        var index = randomizer.digit({
            max: (assets.backgrounds.length - 1)
        });

        var background = new Image();

        background.onload = function() {
            that.paper.drawImage(background, 0, 0);

            callback();
        };

        background.src = assets.backgrounds[index].src;
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createPhotoDrops = function(callback) {
        logger.log(_name, 'createPhotoDrops()');

        callback();
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createProfileDrop = function(callback) {
        logger.log(_name, 'createProfileDrop()');

        callback();
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createTweetDrop = function(callback) {
        logger.log(_name, 'createTweetDrop()');

        callback();
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createSemanticDrops = function(callback) {
        logger.log(_name, 'createSemanticDrops()');

        callback();
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

        //
        // Cloning the incubator canvas.
        //
        var result = this.incubator.clone();

        var format = {
            height: this.incubator.attr('height'),
            width: this.incubator.attr('width')
        };
        var data = this.paper.getImageData(0, 0, format.width, format.height);

        (result.get()[0]).getContext('2d').putImageData(data, 0, 0);

        this.incubator.remove();
        result.show();

        callback(result);
    };

    return MagicWand;
});