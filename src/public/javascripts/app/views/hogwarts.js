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
    'app/views/lucius',
    'app/views/hermione',
    'app/views/ron',
    'app/views/draco',
    'app/views/harry',
    'lib/tpl!app/views/hogwarts.tpl',
    'lib/i18n!app/nls/hogwarts',
    'app/helpers/logger',
    'lib/framework'
],
function(Lucius, Hermione, Ron, Draco, Harry, template, i18n, logger) {
    
    var _name = 'HogwartsView';

    var HogwartsView = Backbone.View.extend({

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        nodes: {
            root: null,
            previousButton: '.controls .previous',
            nextButton: '.controls .next'
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
        events: {
            'click .controls .cancel': 'cancel',
            'click .controls .previous': 'previous',
            'click .controls .next': 'next'
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        handleFlowControl : function(options) {
            // TODO: If it is the last button. Show the "Finish" button.
            if (options.next) {
                if (!this.$nextButton.is(':visible')) {
                    this.$nextButton.fadeIn();
                }
            } else {
                this.$nextButton.hide();
            }

            if (options.previous) {
                if (!this.$previousButton.is(':visible')) {
                    this.$previousButton.fadeIn();
                }
            } else {
                this.$previousButton.hide();
            }
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        examinationsroom: function() {
            var context = this;
            
            var node = '.examinationsroom';

            //
            // DOCME!!!!!
            //
            var current = {
                getNext : function() {
                    return getWannabe(0);
                }
            };

            //
            // DOCME
            //
            var getWannabe = function(index) {
                return wannabewizards[index];
            };

            //
            // DOCME
            //
            var wannabewizards = [
                // 0. Lucius
                {
                    Candidate: Lucius,
                    getNext : function() {
                        return getWannabe(1);
                    },
                    view: null,
                    isFirst: true
                },
                // 1. Hermione
                {
                    Candidate: Hermione,
                    getPrevious : function() {
                        return getWannabe(0);
                    },
                    getNext : function() {
                        return getWannabe(context.model.get('random') ? 3 : 2);
                    },
                    view: null
                },
                // 2. Ron
                {
                    Candidate: Ron,
                    getPrevious : function() {
                        return getWannabe(1);
                    },
                    getNext : function() {
                        return getWannabe(4);
                    },
                    view: null
                },
                // 3. Draco
                {
                    Candidate: Draco,
                    getPrevious : function() {
                        return getWannabe(1);
                    },
                    getNext : function() {
                        return getWannabe(4);
                    },
                    view: null
                },
                // 4. Harry
                {
                    Candidate: Harry,
                    getPrevious : function() {
                        return getWannabe(context.model.get('random') ? 3 : 2);
                    },
                    view: null,
                    isLast: true
                }
            ];

            //
            // summary:
            //     DOCME
            //
            // description:
            //     DOCME
            //
            var toggle = function(isNext) {
                var examinee = current;

                Step(
                    function goaway() {
                        if (examinee.view && examinee.view.destroy) {
                            examinee.view.destroy().then(this);
                        } else {
                            this();
                        }
                    },
                    function comein() {
                        if (isNext) {
                            current = examinee.getNext();
                        } else {
                            current = examinee.getPrevious();
                        }

                        var Candidate = current.Candidate;

                        current.view = new Candidate({
                            el: $(node),
                            model: context.model,
                            user: context.user
                        });

                        // The view is unlocked if the user interacted
                        // with the controls. Each "student view" in hogwarts
                        // decides by his own when it is unlocked.
                        current.view.bind('unlocked', function() {
                            context.handleFlowControl({
                                previous: !(current.isFirst),
                                next: true
                            });
                        });

                        context.handleFlowControl({
                            previous: !(current.isFirst),
                            next: false
                        });
                    }
                );
            };

            return {

                students: (function() {
                    return {

                        //
                        // summary:
                        //     DOCME
                        //
                        // description:
                        //     DOCME
                        //
                        next : function() {
                            toggle(true);
                        },

                        //
                        // summary:
                        //     DOCME
                        //
                        // description:
                        //     DOCME
                        //
                        previous : function() {
                            toggle(false);
                        }
                    };
                }())
            };
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        initialize : function() {
            logger.log(_name, 'HogwartsView::initialize()');

            //
            // Init the "examinations room."
            // DOCME
            //
            this.examinationsroom = this.examinationsroom();

            //
            // DOCME
            //
            this.user = this.options.user;

            this.render();

            this.next();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        destroy : function() {
            var context = this;

            Step(
                function hide() {
                    context.node.fadeOut('slow', this);
                },
                function destroy() {
                    context.node.remove();
                }
            );
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        render : function() {
            this.nodes.root = $(template());
            this.nodes.root.hide();

            this.el.append(this.nodes.root);
            this.nodes.root.fadeIn();

            this.addReferences(this.nodes);
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        cancel : function(e) {
            var context = this;

            if (e) {
                e.preventDefault();
            }

            this.destroy();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        previous : function(e) {
            logger.log(_name, 'Previous student, please ...');

            if (e) {
                e.preventDefault();
            }

            this.examinationsroom.students.previous();
        },

        //
        // summary:
        //     DOCME
        //
        // description:
        //     DOCME
        //
        next : function(e) {
            logger.log(_name, 'Next student, please ...');

            if (e) {
                e.preventDefault();
            }

            this.examinationsroom.students.next();
        }
    });

    return HogwartsView;
});