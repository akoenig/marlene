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
            'black', 'red', 'green'
        ],

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        backgrounds: {
            path: 'images/backgrounds/',

            landscapePath : function() {
                return this.path + 'landscape/'
            },

            portraitPath : function() {
                return this.path + 'portrait/'
            },            

            files: ['0.jpg', '1.jpg']
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        photos: []
    };

    return assets;
});