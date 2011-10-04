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
    'lib/tpl!app/views/workspace.tpl',
    'lib/i18n!app/nls/workspace',
    'app/helpers/logger',
    'lib/framework'
],
function(User, Poster, PosterList, HogwartsView, template, i18n, logger) {
    
    var _name = 'WorkspaceView';

    var WorkspaceView = Backbone.View.extend({
        
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
            logger.log(_name, 'Starting the wizard ...');
            if (e) {
                e.preventDefault();
            }

            var context = this;

            var poster = new Poster();
            context.model.get('posters').add(poster);

window.setInterval(function() {
    console.log("CHECKING THE poster FROM THE WORKSPACE");
    console.log(poster);
}, 10000);

            var hogwarts = new HogwartsView({
                el: context.el,
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