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
        events: {
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
        nodes: {
            posterNode: '#poster',
            downloadButton: 'section#toolbar .download a',
            fullscreenButton: 'section#toolbar .fullscreen a'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        css: {
            button: {
                disabled: 'disabled'
            }
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

            this.addReferences(this.nodes);

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
            logger.log(_name, 'Starting "Hogwarts" ...');

            var that = this;

            if (e) {
                e.preventDefault();
            }

            var hogwarts = null;

            var poster = new Poster();

            //
            // Creating the poster canvas ...
            //
            var canvas = $('<canvas />');
            poster.set({
                canvas: canvas
            });

            that.$posterNode.html(canvas);

            poster.bind('change:produced', function() {
                poster.unbind();

                //
                // Activate the download and fullscreen button
                //
                that.$downloadButton.removeClass(that.css.button.disabled);
                that.$fullscreenButton.removeClass(that.css.button.disabled);

                //
                // Fix the poster position.
                //
                var sizes = {
                    canvas: {
                        width: that.$posterNode.width()
                    },
                    viewport: {
                        width: $(document).width()
                    }
                };

                var left = ((sizes.viewport.width - sizes.canvas.width) / 2) + 'px';
                that.$posterNode
                    .css('left', left)
                    .fadeIn();
            });

            that.model.get('posters').add(poster);

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
                user: that.model.get('user')
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

            var imageMIME = 'image/jpeg';
            var octetMIME = 'image/octet-stream';

            var canvas = this.$posterNode.children('canvas')[0];
            var data = canvas.toDataURL(imageMIME);

            document.location.href = data.replace(imageMIME, octetMIME);
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