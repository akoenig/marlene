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
	'app/models/user',
    'app/helpers/logger',
    'lib/framework'
],
function(User, logger) {
    
    var _name = 'WorkspaceView';

    var WorkspaceView = Backbone.View.extend({
        
        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
        	var user = this.options.user;

            this.model = new Backbone.Model();
            this.model.set({
                user: user,
                posters: []
            });

            logger.log(_name, 'Created workspace ... ' + JSON.stringify(this.model));
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        render : function() {

        }
    });

    return WorkspaceView;
});