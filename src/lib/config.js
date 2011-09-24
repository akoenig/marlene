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
function gulp() {
    var filename = __dirname+"/../config.json";
    var content = require("fs").readFileSync(filename);
    
    if (!content) {
        throw new Error("[ERROR]: config file "+filename+" is not readable.");
    }
  
    return JSON.parse(content);
};

exports.gulp = gulp();