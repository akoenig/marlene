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
    'vendor/tpl!app/views/harry.tpl',
    'vendor/i18n!app/nls/harry',
    'app/helpers/logger',
    'vendor/framework'
],
function(template, i18n, logger) {
    
    var _name = 'HarryView';

    var HarryView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        nodes: {
            root: null
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        user: null,

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
            logger.log(_name, 'initialize ...');

            this.user = this.options.user;

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
            var context = this;

            this.nodes.root = $(template({
                i18n: i18n,
                landscape: context.model.get('landscape'),
                tweet: context.model.get('tweet').toJSON(),
                user: context.user.toJSON()
            }));

            this.el.empty().append(this.nodes.root);
        }
    });

    return HarryView;
});