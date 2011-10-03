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
 var loggly = require('loggly');

exports.logger = function(config, enableJson) {
    config.json = enableJson;
    var client = loggly.createClient(config);

    return {
        log : function(message) {
            client.log(config.token, message);

            if (config.stdout) {
                console.log(message);
            }
        }
    };
};