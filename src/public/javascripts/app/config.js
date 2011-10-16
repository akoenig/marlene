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
    'vendor/framework'
],
function() {

    var config = {
        logging: true,
        polling: {
            active: true,
            interval: 10000
        },
        nodes: {
            root: $('#marlene'),
            loading: $('#loading'),
            error: $('#error')
        }
    };

    return config;
});