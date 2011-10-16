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
    'app/config',
    'vendor/framework'
],
function(config) {

    var _name = 'Logger';

    var _generateTimestamp = function() {
        var date = new Date();
        return ((((date.getFullYear()*100 + date.getMonth()+1)*100 + date.getDate())*100 + date.getHours())*100 + date.getMinutes())*100 + date.getSeconds() + date.getMilliseconds();
    };

    var logger = {

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        log : function(module, message) {
            if (config.logging) {
                var timestamp = _generateTimestamp();

                if (typeof message === 'object') {
                    message = JSON.stringify(message);
                }

                console.log('[' + timestamp + '] ' + module + ': ' + message);
            }
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        error : function(module, message) {
            var timestamp = _generateTimestamp();

            throw '[' + timestamp + '] ' + module + ': ' + message;
        }
    };

    return logger;
});