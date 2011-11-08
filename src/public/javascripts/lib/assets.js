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

],
function() {

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    var assets = {

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        formats: {
            landscape: {
                height:768,
                width:1024
            },
            portrait: {
                height:1024,
                width:768
            }
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        backgrounds: {
            landscape: {
                files: [
                    {
                        src: 'images/backgrounds/landscape/0.jpg',
                        textcolor: '#fff'
                    },
                    {
                        src: 'images/backgrounds/landscape/1.jpg',
                        textcolor: '#000'
                    }
                ]
            },
            portrait: {
                files: [
                    {
                        src: 'images/backgrounds/portrait/0.jpg',
                        textcolor: '#fff'
                    },
                    {
                        src: 'images/backgrounds/portrait/1.jpg',
                        textcolor: '#000'
                    }
                ]
            }
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        themes: [ [ "#10222B", "#95AB63", "#BDD684", "#E2F0D6", "#F6FFE0" ],
            [ "#362C2A", "#732420", "#BF734C", "#FAD9A0", "#736859" ],
            [ "#0D1114", "#102C2E", "#695F4C", "#EBBC5E", "#FFFBB8" ],
            [ "#2E2F38", "#FFD63E", "#FFB54B", "#E88638", "#8A221C" ],
            [ "#121212", "#E6F2DA", "#C9F24B", "#4D7B85", "#23383D" ],
            [ "#343F40", "#736751", "#F2D7B6", "#BFAC95", "#8C3F3F" ],
            [ "#000000", "#2D2B2A", "#561812", "#B81111", "#FFFFFF" ],
            [ "#333B3A", "#B4BD51", "#543B38", "#61594D", "#B8925A" ] ],

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        photos: {
            path: 'images/photos/',
            files: ['0.jpg', '1.jpg', '3.jpg', '4.jpg']
        }
    };

    return assets;
});