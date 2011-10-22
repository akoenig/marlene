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

        var count = randomizer.digit({
            min: 1,
            max: 3  
        });

        this.pencil.createPhotoDrops(count).then(function(drops) {
            logger.log(_name, 'Created all drops ...');

            console.log(drops);

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

        var user = this.user.toJSON();

        var profile = {
            avatar: user.avatar,
            nick: user.nick,
            name: user.name,
            description: user.description,
            followers: user.followers,
            statuscount: user.statuscount
        };

        this.pencil.createProfileDrop(profile).then(function(profileDrop) {

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