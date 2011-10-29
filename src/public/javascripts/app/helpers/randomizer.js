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
         // TODO: Integrate check if the count is smaller than the range
         // between min/max and the unique flag is set. This will cause an endless loop.
         //
        digit : function(options) {
            var artefact;

            options = options || {};

            var min = options.min || 0;
            var max = ((options.max === 0) ? 1 : options.max) || -1;

            //
            // DOCME
            //
            var _generate = function() {
                return Math.round((Math.random() * (max - min)) + min);
            };

            if (max === -1) {
                logger.error(_name, 'You have to specifiy at least the max value.');
            }

            if (options.count) {
                artefact = [];

                var i = 1;
                for (i; i <= options.count; i++) {

                    if (options.unique) {
                        var added = false;

                        while (!added) {
                            var exists = false;
                            var digit = _generate();

                            artefact.forEach(function(value, index) {
                                if (digit === value) {
                                    exists = true;
                                }
                            });

                            if (!exists) {
                                added = true;
                                artefact.push(digit);
                            }
                        }
                    } else {
                        artefact.push(_generate());
                    }
                }
            } else {
                artefact = _generate();
            }

            return artefact;
        }
     };
});