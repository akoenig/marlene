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
        // The physics engine ...
        //
        this.world = null;

        //
        // DOCME
        //
        this.pencil = new Pencil();
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

        var canvas = that.poster.get('canvas');
        var paper = canvas[0].getContext('2d');

        //
        // Grabbing the type (landscape or portrait) ...
        //
        var format = (this.poster.get('landscape') === true) ? 'landscape' : 'portrait';

        //
        // Canvas setup ...
        //
        canvas
            .attr({
                id: 'poster-' + new Date().getTime(),
                height: assets.formats[format].height,
                width: assets.formats[format].width
            });

        //
        // Physics engine setup ...
        //
        var virtual = new b2AABB();
        virtual.minVertex.Set(-200, -200);
        virtual.maxVertex.Set(canvas.width() + 200, canvas.height() + 200 );

        that.world = new b2World(virtual, new b2Vec2(0, 0), true);

        //
        // Start the randomizer for selecting the background image ...
        //
        var random = randomizer.digit({
            max: (assets.backgrounds[format].files.length - 1)
        });

        //
        // Paint the background image.
        //
        var background = new Image();
        background.onload = function() {
            paper.drawImage(background, 0, 0);

            callback();
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

        var canvas = that.poster.get('canvas');

        var count = randomizer.digit({
            min: 2,
            max: 4
        });

        that.pencil.createPhotoDrops(count).then(function(drops) {
            drops.forEach(function(drop) {
                canvas.append(drop);
console.log("1");
                /*var b2body = new b2BodyDef();

                var circle = new b2CircleDef();
                circle.radius = drop.width() >> 1;
                circle.density = 1;
                circle.friction = 0.3;
                circle.restitution = 0.3;

                b2body.AddShape(circle);
                b2body.userData = {element: drop[0]};
console.log("2");
                b2body.position.Set(0, 0);
                b2body.linearVelocity.Set( Math.random() * 400 - 200, Math.random() * 400 - 200 );*/
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