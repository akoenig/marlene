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
    'lib/tpl!app/views/lucius.tpl',
    'lib/i18n!app/nls/lucius',
    'app/helpers/logger',
    'lib/framework'
],
function(template, i18n, logger) {
    
    var _name = 'LuciusView';

    var LuciusView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        node: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        events: {
            'click .format .landscape' : 'landscape',
            'click .format .portrait' : 'portrait'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
            logger.log(_name, 'initialize ...');

            this.render();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        destroy : function() {
            var deferred = $.Deferred();

            node.fadeOut('slow', function() {
                node.remove();

                deferred.resolve();
            });

            return deferred.promise();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        render : function() {
            node = $(template());

            this.el.empty().append(node);
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        landscape : function(e) {
            if (e) {
                e.preventDefault();
            }

            this.model.set({
                landscape: true
            });
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        portrait : function(e) {
            if (e) {
                e.preventDefault();
            }

            this.model.set({
                landscape: false
            });
        }
    });

    return LuciusView;
});