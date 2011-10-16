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
	'vendor/raphael',
    'vendor/framework'
],
function(logger) {

    var _name = 'MagicWand';

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    function MagicWand() {
    	logger.log(_name, 'Creating a new MagicWand ...');
    };

    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    MagicWand.prototype.waggle = function() {
    	logger.log(_name, 'Waggling the MagicWand ...');
    };

    return MagicWand;
});