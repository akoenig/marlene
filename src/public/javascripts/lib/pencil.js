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
    'lib/assets',
    'app/helpers/randomizer',
    'vendor/framework'
],
function(logger, assets, randomizer) {


    var _name = 'Pencil';

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    var Pencil = function() {
        this.$bodyNode = $('body');
    };
    
    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Pencil.prototype.createPhotoDrops = function(count) {
        logger.log(_name, 'createPhotoDrops -> ' + count);

        var that = this;

        count = count || 1;

        var deferred = $.Deferred();

        //
        // The cache with the created drops.
        //
        var drops = [];

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        var _createPhotoDrop = function() {

            var canvas = $('<canvas />');
            that.$bodyNode.append(canvas);

            //
            // Defining a random border width
            //
            var border = randomizer.digit({min: 20, max: 30});

            //
            // The start position for the drawing stuff.
            //
            var start = {};

            //
            // The canvas format
            //
            var format = {};

            //
            // Getting the drawing context ...
            //
            var paper = canvas[0].getContext('2d');
            console.log(paper);
            paper.beginPath();

            // Random radius (could be different height and width).
            rand = randomizer.digit({ // [0] -> height; [1] -> width
                min: 300,
                max: 400
            });

            var circle = (randomizer.digit({min: 0, max: 1}) === 1);

            if (circle) {

                format.height = rand;
                format.width = rand;

                canvas.attr(format);

                format.height = format.height - (border*2);
                format.width = format.width - (border*2);

                start.x = (format.width / 2);
                start.y = (format.height / 2);

                paper.arc(start.x, start.y, (format.width / 2), 0, Math.PI*2, true);
            } else {

                format.height = rand;
                format.width = rand;

                canvas.attr(format);

                format.height = format.height - (border*2);
                format.width = format.width - (border*2);

                start.x = (format.width / 2);
                start.y = border;

                paper.moveTo(start.x, start.y);
                paper.quadraticCurveTo(0, start.y, 0, (format.height / 2));
                paper.quadraticCurveTo(0, format.height, (format.width / 2), format.height);
                paper.quadraticCurveTo(format.width, format.height, format.width, (format.height / 2));
                paper.lineTo(format.width, start.y);
                paper.lineTo((format.width / 2), start.y);
            }

            rand = randomizer.digit({
                min: 0,
                max: assets.colors.length - 1
            });

            paper.clip();

            //
            // Rendering the photo.
            //
            rand = randomizer.digit({
                min: 0,
                max: assets.photos.files.length - 1
            });

            var photo = new Image();

            photo.onload = function() {
                paper.drawImage(photo, 0, 0);
                paper.closePath();

                rand = randomizer.digit({max: assets.colors.length - 1});

                paper.strokeStyle = assets.colors[rand];

                paper.lineWidth = border;
                paper.stroke();

                drops.push(canvas);

                if (drops.length === count) {
                    deferred.resolve(drops);
                }
            };

            photo.src = assets.photos.path + assets.photos.files[rand];
        };

        //
        // DOCME
        //
        var i = 1;

        for (i; i <= count; i++) {
            _createPhotoDrop();
        }

        return deferred.promise();
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Pencil.prototype.createProfileDrop = function(profile) {
        var deferred = $.Deferred();

        window.setTimeout(function() {
            deferred.resolve();
        }, 5000);

        return deferred.promise();
	};

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Pencil.prototype.createTweetDrop = function(content) {
        var that = this;
        
        var deferred = $.Deferred();

        var tweet = {
            canvas: $('<div />'),
            paper: null,
            content: content
        };

        that.bodyNode.append(tweet.canvas);
        //tweet.canvas.hide();

        tweet.paper = Raphael(tweet.canvas[0], 200, 200);

        var text = tweet.paper.text(100, 100).attr('text-anchor', 'middle');
        text.attr({font: '16px Helvetica, Arial', opacity: 1, fill: "#efefef"});
        var words = tweet.content.split(' ');

        tweet.content = '';

        words.forEach(function(word) {
            text.attr('text', tweet.content + ' ' + word);

            if (text.getBBox().width > 200) {
                tweet.content += '\n' + word;
            } else {
                tweet.content += " " + word;
            }
        });

        text.attr('text', tweet.content.substring(1));

console.log(text.getBBox().height);
        console.log(text.getBBox().width);

        window.setTimeout(function() {
            console.log(tweet.canvas.html());
            deferred.resolve(tweet.canvas.html());
        }, 2000);

        return deferred.promise();
    };

    return Pencil;
});