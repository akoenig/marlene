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
            canvas.hide();
            that.$bodyNode.append(canvas);

            //
            // Defining a random border width
            //
            var border = randomizer.digit({min: 5, max: 10});

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

            paper.beginPath();

            // Random radius (could be different height and width).
            rand = randomizer.digit({min: 30, max: 150});

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

                var theme = randomizer.digit({min: 0, max: assets.themes.length - 1});
                var color = randomizer.digit({min: 0, max: assets.themes[theme].length - 1});

                paper.strokeStyle = assets.themes[theme][color];

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
    Pencil.prototype.createBalls = function(count) {
        var deferred = $.Deferred();

        var balls = [];

        var i = 0;

        for (i; i <= count; i++) {
            var size = (Math.random() * 50);

            var canvas = $('<canvas />');
            canvas
                .attr({
                    width: size,
                    height: size
                })
                .css({
                    position: 'absolute'
                });

            var graphics = canvas[0].getContext("2d");

            var circles = Math.random() * 5;

            for (var j = size; j > 0; j-= (circles)) {
                var theme = randomizer.digit({min: 0, max: assets.themes.length - 1});
                var color = randomizer.digit({min: 0, max: assets.themes[theme].length - 1});

                graphics.fillStyle = assets.themes[theme][color];
                graphics.beginPath();
                graphics.arc(size * 0.5, size * 0.5, j * 0.5, 0, Math.PI*2, true); 
                graphics.closePath();
                graphics.fill();
            }

            balls.push(canvas);

            if (balls.length === count) {
                deferred.resolve(balls);
            }
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
    Pencil.prototype.createWords = function(tweet) {
        var elements = [];

        var words = tweet.split(' ');

        var hasBackground = false;

        words.forEach(function(word) {
            var bold = randomizer.digit({min:0, max: 1}) === 1;

            word = $('<p />')
                .html(word)
                .css({
                    fontWeight: (bold) ? 'bold' : 'normal',
                    position:'absolute'
                });

            var background = randomizer.digit({min:0, max: 1}) === 1;

            if (background && !hasBackground) {
                hasBackground = true;
                word
                    .css({
                        background: (background) ? '#d14836' : 'none',
                        color: '#fff'
                    });
            }

            elements.push(word);
        });

        return elements;
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

        var size = 150;

        var element = $('<div />')
            .css({
                width: size + 'px',
                height: size + 'px',
                position: 'absolute'
            })
            .hide()
            .appendTo('body');
       
       var circle = $('<canvas />')
           .attr({
               width: size,
               height: size
           });

        var graphics = circle[0].getContext('2d');

        var theme = randomizer.digit({min: 0, max: assets.themes.length - 1});
        var color = randomizer.digit({min: 0, max: assets.themes[theme].length - 1});

        graphics.fillStyle = assets.themes[theme][color];
        graphics.beginPath();
        graphics.arc(size * 0.5, size * 0.5, size * 0.5, 0, Math.PI*2, true);
        graphics.closePath();
        graphics.fill();

        element.append(circle);

        var text = $('<div />')
            .html('PROFILEasd asdasdasdasdasdasdasd')
            .css({
                color: '#000',
                position: 'absolute',
                fontFamily: 'Georgia',
                textAlign: 'center'
            });
 
        element.hide();
        
        element.append(text);

console.log("SIZES");
console.log(text.width());
console.log(text.height());

        text
            .css({
                left: ((150 - text.width()) / 2) +'px',
                top: ((150 - text.height()) / 2) +'px'
            });

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