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
    'vendor/framework'
],
function(logger) {

    var _name = 'randomizer';

    return {

     	//
        // summary:
     	//     DOCME
     	//
     	// description:
     	//     DOCME
     	//
     	digit : function(range) {
     		range = range || {};

     		var min = range.min || 0;
     		var max = range.max || 0;

     		if (max === 0) {
     			logger.error(_name, 'You have to specifiy at least the max value.');
     		}

            return Math.round((Math.random() * (max - min)) + min);
     	}
     }
});