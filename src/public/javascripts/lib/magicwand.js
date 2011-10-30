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

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        this.generateAnchors = function(forItemCount) {
            var that = this;

            var anchors = [];

            var count = forItemCount + 1;

            var format = {
                height: that.incubator.height(),
                width: that.incubator.width()
            };

            var cell = {
                height: (that.incubator.height() / count),
                width: (that.incubator.width() / count)
            };

            var col = 1;
            for (col; col < count; col++) {
                var x = Math.round(cell.width * col);

                var row = 1;
                for (row; row < count; row++) {
                    var y = Math.round(cell.height * row);

                    var anchor = {
                        x: x,
                        y: y
                    };

                    anchors.push(anchor);
                }
            }

            return anchors;
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
        var type = (this.poster.get('landscape') === true) ? 'landscape' : 'portrait';

        var index = randomizer.digit({
            max: (assets.backgrounds[type].files.length - 1)
        });

        var background = assets.backgrounds[type].files[index];

        var backgroundImage = new Image();

        backgroundImage.onload = function() {
            that.poster.set({
                background: background
            });
            that.paper.drawImage(backgroundImage, 0, 0);

            callback();
        };

        backgroundImage.src = background.src;
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

        var count = randomizer.digit({
            min: 2,
            max: 4
        });

        that.pencil.createPhotoDrops(count).then(function(drops) {

            var anchors = that.generateAnchors(count);

            drops.forEach(function(drop) {
                var node = drop;

                drop = drop[0]; // Because of the returned jQuery object.

                var index = randomizer.digit({min: 0, max: anchors.length - 1});
                var anchor = anchors.splice(index, 1)[0];

                that.paper.drawImage(drop, anchor.x, anchor.y);

                // Delete the separate drop node from the dom.
                node.remove();
            });
        });

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

        var that = this;

        var tweet = that.poster.get('tweet').toJSON().text;

        this.pencil.createTweetDrop(tweet).then(function(tweetDropSVG) {

            that.paper.drawSvg(tweetDropSVG, 0, 0);

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