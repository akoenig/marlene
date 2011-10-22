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
    Pencil.prototype.createPhotodrop = function() {
        logger.log(_name, '_createPhotodrop');

        var rand = randomizer.digit({
            min: 0,
            max: 1
        });
rand = 0;
        var circle = (rand === 1);

        var canvas = $('<canvas />');
     //            canvas.hide();
        $('body').append(canvas);

        //
        // Defining a random border width
        //
        var border = randomizer.digit({min: 5, max: 30});

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
        var paper = canvas.get()[0].getContext('2d');
        paper.beginPath();

        if (circle) {

            // Random radius (between 250 and 400).
            rand = randomizer.digit({min: 250,max: 400});

            format.height = rand;
            format.width = rand;

            canvas.attr(format);

            format.height = format.height - border;
            format.width = format.width - border;

            start.x = (format.width / 2);
            start.y = (format.height / 2);

            paper.moveTo(start.x, start.y);
            paper.arc(start.x, start.y, format.width, 0, Math.PI*2, true);
        } else {

            // Random radius (could be different height and width).
            rand = randomizer.digit({ // [0] -> height; [1] -> width
                min: 250,
                max: 400,
                count: 2
            });

            format.height = rand[0];
            format.width = rand[1];

            canvas.attr(format);

            format.height = format.height - border;
            format.width = format.width - border;

            start.x = (format.width / 2);
            start.y = border;

            paper.moveTo(start.x, start.y);
            paper.quadraticCurveTo(0, start.y, 0, (format.height / 2));
            paper.quadraticCurveTo(0, format.height, (format.width / 2), format.height);
            paper.quadraticCurveTo(format.width, format.height, format.width, (format.height / 2));
            paper.lineTo(format.width, start.y);
            paper.lineTo((format.width / 2), start.y);
        }

        paper.closePath();

        rand = randomizer.digit({
            min: 0,
            max: assets.colors.length - 1
        });

        paper.strokeStyle = assets.colors[rand];

        paper.lineWidth = border;
        paper.stroke();

        paper.clip();

        // TODO: Load photo

        return canvas;
    };

    return Pencil;
});