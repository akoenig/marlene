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
    'vendor/tpl!app/views/lucius.tpl',
    'vendor/i18n!app/nls/lucius',
    'app/helpers/logger',
    'vendor/framework'
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
        nodes: {
            root: null,
            landscapeButton: '.format .landscape',
            portraitButton: '.format .portrait'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        css: {
            classes: {
                selected: 'selected'
            }
        },

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
            this.nodes.root = $(template({
                i18n: i18n
            }));

            this.el.empty().append(this.nodes.root);
            
            this.addReferences(this.nodes);
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

            this.$portraitButton.removeClass(this.css.classes.selected);
            this.$landscapeButton.addClass(this.css.classes.selected);

            this.model.set({
                landscape: true
            });

            this.trigger('unlocked');
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

            this.$landscapeButton.removeClass(this.css.classes.selected);
            this.$portraitButton.addClass(this.css.classes.selected);

            this.model.set({
                landscape: false
            });

            this.trigger('unlocked');
        }
    });

    return LuciusView;
});