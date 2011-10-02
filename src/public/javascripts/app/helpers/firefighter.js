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
//     The firefighter helper.
//
// description:
//     The firefighter handles exceptions from the application.
//
define([
	'app/helpers/logger',
    'lib/framework'
],
function(logger) {

    var name = 'Firefighter';

    return {
    	
    	//
    	// summary:
    	//     DOCME
    	//
    	// description:
    	//     DOCME
    	//
    	alarm : function() {
    		logger.log(name, 'boot ...')
    	}
    };
});