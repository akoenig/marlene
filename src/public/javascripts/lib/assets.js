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
        colors: [
            'rgba(86,92,84,0.2)', 'rgba(253,92,84,0.5)', 'rgba(0,92,84,0.2)', 'rgba(169,100,85,0.2)'
        ],

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
                        holes: [ // Places that should always be visible.
                            {x:0, y:0 , w:0, h:0},
                            {x:0, y:0 , w:0, h:0}
                        ]
                    },
                    {
                        src: 'images/backgrounds/landscape/1.jpg',
                        holes: [ // Places that should always be visible.
                            {x:0, y:0 , w:0, h:0},
                            {x:0, y:0 , w:0, h:0}
                        ]
                    }
                ]
            },
            portrait: {
                files: [
                    {
                        src: 'images/backgrounds/portrait/0.jpg',
                        holes: [ // Places that should always be visible.
                            {x:0, y:0 , w:0, h:0},
                            {x:0, y:0 , w:0, h:0}
                        ]
                    },
                    {
                        src: 'images/backgrounds/portrait/1.jpg',
                        holes: [ // Places that should always be visible.
                            {x:0, y:0 , w:0, h:0},
                            {x:0, y:0 , w:0, h:0}
                        ]
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
        photos: {
            path: 'images/photos/',
            files: ['0.jpg', '1.jpg', '3.jpg', '4.jpg']
        }
    };

    return assets;
});