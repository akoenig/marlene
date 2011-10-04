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
    'app/models/poster',
    'lib/framework'
],
function(Poster) {

    var _name = 'PosterList';

    var PosterList = Backbone.Collection.extend({
        model: Poster
    });

    return PosterList;
});