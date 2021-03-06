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
define([
    'vendor/framework'
],
function() {

    var _name = 'Poster';

    var Poster = Backbone.Model.extend({
        defaults: {
            produced: false
        }
    });

    return Poster;
});