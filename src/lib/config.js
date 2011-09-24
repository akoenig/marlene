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
var fs = require('fs');

function gulp() {
    var filename = __dirname+"/../config.json";

    try {
        var path = fs.realpathSync(filename);
    } catch (e) {
    	if (e.message.indexOf('No such file') !== -1) {
    		throw new Error('[ERROR] Configuration file is not available. Please create the file an restart the app again.');
    	}
    }

    var content = fs.readFileSync(filename);

    if (!content) {
        throw new Error("[ERROR]: config file "+filename+" is not readable.");
    }
  
    return JSON.parse(content);
};

exports.gulp = gulp();