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
    'lib/framework'
],
function() {

    var config = {
        logging: true,
        polling: {
        	active: true,
        	interval: 120000
        },
        nodes: {
        	root: null,
        	loading: $('#loading'),
        	error: $('#error')
        }
    };

    return config;
});