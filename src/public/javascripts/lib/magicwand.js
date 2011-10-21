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

        //
        // DOCME
        //
        this.shapes = {
            photodrops: [],
            profiledrop: null,
            tweetdrop: null,
            semanticdrops: []
        };

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        this._createPhotodrop = function() {
            logger.log(_name, '_createPhotodrop');

            var rand = randomizer.digit({
                min: 0,
                max: 1
            });

            var circle = (rand === 1);

            rand = randomizer.digit({
                min: 200,
                max: 400
            });

            var canvas = $('<canvas />');
            canvas.hide();
            $('body').append(canvas);

            var format = {
                height: rand,
                width: rand
            };
            canvas.attr(format);

            var border = 10;

            // Removing the border width from
            // the format ...
            format.height -= border;
            format.width -= border;

            // The start position for the drawing stuff.
            var start = {};

            var paper = canvas.get()[0].getContext('2d');
            paper.beginPath();

            if (circle) {
                start.x = (format.width / 2);
                start.y = (format.height / 2);

                paper.moveTo(start.x, start.y);
                console.log('Radius: ' + format.width);
                console.log(start);
                paper.arc(start.x, start.y, format.width, 0, Math.PI*2, true);
            } else {
                start.x = (format.width / 2);
                start.y = border;

                paper.moveTo(start.x, start.y);
                paper.quadraticCurveTo(0, 0, 0, (format.height / 2));
                paper.quadraticCurveTo(0, format.height, (format.width / 2), format.height);
                paper.quadraticCurveTo(format.width, format.height, format.width, (format.height / 2));
                paper.lineTo(format.width, start.y);
                paper.lineTo((format.width / 2), start.y);
            }

            paper.closePath();
            paper.lineWidth = border;
            paper.stroke();

            paper.clip();

            // TODO: Load photo

            return canvas;
        };
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

        var isLandscape = (this.poster.get('landscape') === true);

        var background = new Image();

        var randomIndex = randomizer.digit({
            max: (assets.backgrounds.length - 1)
        });

        background.onload = function() {
            if (!isLandscape) {
                that.paper.translate(background.height, 0);
                that.paper.rotate((90 * Math.PI) / 180);
                that.paper.drawImage(background, 0, 0);
                that.paper.rotate((-90 * Math.PI) / 180);
                that.paper.translate(-background.height, 0);
            } else {
                that.paper.drawImage(background, 0, 0);
            }

            callback();
        };

        background.src = assets.backgrounds[randomIndex].src;
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

        var photodrop = this._createPhotodrop();
        console.log(photodrop);
        $('body').appendChild(photodrop);

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