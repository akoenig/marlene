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
    'lib/pencil',
    'app/helpers/logger',
    'app/helpers/randomizer',
    'lib/assets',
    'vendor/framework'
],
function(Pencil, logger, randomizer, assets) {

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
        this.pencil = new Pencil();

        this.helpers = {
            shrink : function(canvas) {
                var size = canvas.attr('width');

                canvas.css({
                    height: size - ((size * 20) / 100) + 'px',
                    width: size - ((size * 20) / 100) + 'px'
                });
            }
        }
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

        var that = this;

        var container = that.poster.get('container');

        //
        // Grabbing the type (landscape or portrait) ...
        //
        var format = (this.poster.get('landscape') === true) ? 'landscape' : 'portrait';

        //
        // Start the randomizer for selecting the background image ...
        //
        var random = randomizer.digit({max: (assets.backgrounds[format].files.length - 1)});

        //
        // Paint the background image.
        //
        var background = new Image();

        background.onload = function() {
            var viewport = $(document);

            background = $(background);
            container
                .append(background)
                .css({
                    position: 'absolute',
                    top: ((viewport.height() - container.height()) / 2) + 'px',
                    left: ((viewport.width() - container.width()) / 2) + 'px'
                })
                .fadeIn('slow', callback);
        };

        background.src = assets.backgrounds[format].files[random].src;
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

        var that = this;

        var container = that.poster.get('container');

        var count = randomizer.digit({min: 2, max: 10});

        that.pencil.createPhotoDrops(count).then(function(drops) {
            drops.forEach(function(drop) {
                window.setTimeout(function() {
                    drop
                        .css({
                            left: randomizer.digit({min: 1, max: container.width()}),
                            position: 'absolute'
                        })
                        .draggable({containment: 'parent'})
                        .hide();

                    that.helpers.shrink(drop);

                    container.append(drop);

                    var distance = container.height() - drop.height();

                    //
                    // Gravity animation
                    //
                    drop
                        .fadeIn()
                        .animate({
                            top: distance + 'px'
                        }, 1000, 'easeOutBounce');
                }, randomizer.digit({min: 1, max: 3000}));
            });

            callback();
        });
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createBalls = function(callback) {
        logger.log(_name, 'createBalls()');

        var that = this;

        var container = that.poster.get('container');

        var count = randomizer.digit({min: 2, max: 10});

        that.pencil.createBalls(count).then(function(balls) {
            balls.forEach(function(ball) {
                window.setTimeout(function() {
                    ball
                        .css({
                            left: randomizer.digit({min: 1, max: container.width()}),
                            position: 'absolute'
                        })
                        .draggable({containment: 'parent'})
                        .hide();

                    that.helpers.shrink(ball);

                    container.append(ball);

                    var distance = container.height() - ball.height();

                    //
                    // Gravity animation
                    //
                    ball
                        .fadeIn()
                        .animate({
                            top: distance + 'px'
                        }, 1000, 'easeOutBounce');
                }, randomizer.digit({min: 1, max: 3000}));
            });

            callback();
        });
    }

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.createProfileDrop = function(callback) {
        logger.log(_name, 'createProfileDrop()');

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

    };

    return MagicWand;
});