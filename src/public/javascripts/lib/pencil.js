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

    var Pencil = function() {};
    
    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    Pencil.prototype.createPhotoDrops = function(count) {
        logger.log(_name, 'createPhotoDrops -> ' + count);

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

            // Verify that the element will be removed later on!
            $('body').append(canvas);

            //
            // Defining a random border width
            //
            var border = randomizer.digit({min: 10, max: 30});

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
            rand = randomizer.digit({ // [0] -> height; [1] -> width
                min: 300,
                max: 600,
                count: 2
            });

            var circle = (randomizer.digit({min: 0,max: 1}) === 1);

            if (circle) {

                format.height = rand[0];
                format.width = rand[0];

                canvas.attr(format);

                format.height = format.height - (border*2);
                format.width = format.width - (border*2);

                start.x = (format.width / 2);
                start.y = (format.height / 2);

                paper.arc(start.x, start.y, (format.width / 2), 0, Math.PI*2, true);
            } else {

                format.height = rand[0];
                format.width = rand[1];

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

                paper.globalAlpha = 0.5;
                paper.globalCompositeOperation = 'destination-in';

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

    return Pencil;
});