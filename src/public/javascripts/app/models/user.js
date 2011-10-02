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
    'lib/framework'
], function() {

    var User = Backbone.Model.extend({
    	url: '/twitter/meta',

    	initialize : function() {
    		var context = this;

    		context.fetch({
    			success : function(me, answer) {
    				var data = JSON.parse(answer.data);

    				context.clear().set(data);
    			}
    		});
    	}
    });

    return User;
});
