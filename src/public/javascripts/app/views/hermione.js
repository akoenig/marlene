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
    'lib/tpl!app/views/hermione.tpl',
    'lib/i18n!app/nls/hermione',
    'app/helpers/logger',
    'lib/framework'
],
function(template, i18n, logger) {
    
    var _name = 'HermioneView';

    var HermioneView = Backbone.View.extend({

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
        }
    });

    return HermioneView;
});