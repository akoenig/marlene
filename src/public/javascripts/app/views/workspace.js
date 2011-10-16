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
    'app/models/poster',
    'app/models/posterlist',
    'app/views/hogwarts',
    'vendor/tpl!app/views/workspace.tpl',
    'vendor/i18n!app/nls/workspace',
    'app/helpers/logger',
    'vendor/framework'
],
function(User, Poster, PosterList, HogwartsView, template, i18n, logger) {
    
    var _name = 'WorkspaceView';

    var WorkspaceView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        events:{
            'click section#toolbar .create': 'create',
            'click section#toolbar .download': 'download',
            'click section#toolbar .fullscreen': 'fullscreen',

            'click section#user': 'toggleUserControl'
        },

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
                posters: new PosterList()
            });

            logger.log(_name, 'Created workspace ... ' + JSON.stringify(this.model));

            this.render();
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

            template = template({
                i18n: i18n,
                user: context.model.get('user').toJSON()
            });

            this.el.empty().append(template);

            // Setup the model binding.
            Backbone.ModelBinding.bind((function() {
                var user = context.model.get('user');

                var bindable = _.clone(context);
                bindable.model = user;

                return bindable;
            }()));

            return this;
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        create : function(e) {
            var context = this;
            logger.log(_name, 'Starting "Hogwarts" ...');

            if (e) {
                e.preventDefault();
            }

            var hogwarts = null;

            var poster = new Poster();
            poster.bind('change:produced', function() {
                logger.log(_name, 'The poster was generated.');

                poster.unbind();

                hogwarts.destroy();

                // TODO: Display the poster on a canvas.
                // poster.get('data');
            });

            context.model.get('posters').add(poster);

            //
            // The following dom node is only for temporary purposes.
            // It is the Hogwarts el-element, which will be destroyed on
            // "hogwarts destroy".
            //
            var hogwartsArea = $('<div />');
            $(this.el).append(hogwartsArea);

            hogwarts = new HogwartsView({
                el: hogwartsArea,
                model: poster,
                user: context.model.get('user')
            });
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        download : function() {
            logger.log(_name, 'Downloading the current poster ...');
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        fullscreen : function() {
            logger.log(_name, 'Open the current poster in fullscreen mode ...');
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        toggleUserControl : function(e) {
            var control = $(e.currentTarget).children('nav');

            if (control.is(':visible')) {
                control.fadeOut();
            } else {
                control.fadeIn();
            }
        }
    });

    return WorkspaceView;
});