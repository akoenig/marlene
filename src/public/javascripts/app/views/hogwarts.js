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
    'lib/tpl!app/views/hogwarts.tpl',
    'lib/i18n!app/nls/hogwarts',
    'app/helpers/logger',
    'lib/framework'
],
function(Lucius, template, i18n, logger) {
    
    var _name = 'HogwartsView';

    var HogwartsView = Backbone.View.extend({

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
        examinationsroom: {
        	node: '.examinationsroom',
        	current: {
        	    no: -1,
        	    examinee: null
        	},
        	students: function(no) {
        		var instances = [Lucius /*, Hermione, Ron, Draco, Colin, Harry*/];

        		return instances[no];
        	}
        },

	    //
	    // summary:
	    //     DOCME
	    //
	    // description:
	    //     DOCME
	    //
        _audit : function() {
        	logger.log(_name, 'Next candidate for the examination ...');

        	var context = this;

            var examinee = context.examinationsroom.examinee;

        	Step(
                function goaway() {
                	if (examinee) {
                        examinee.destroy(this);
                    } else {
                    	return this;
                    }
                },
                function comein() {

                	context.examinationsroom.current.no++;

                	var Candidate = context.examinationsroom.students(context.examinationsroom.current.no);

                    var next = new Candidate({
                    	el: $(context.examinationsroom.node),
                    	model: null
                    });

                    context.examinationsroom.current.examinee = next;
                }
        	);
        },

        _reaudit : function() {},

	    //
	    // summary:
	    //     DOCME
	    //
	    // description:
	    //     DOCME
	    //
	    initialize : function() {
	    	logger.log(_name, 'HogwartsView::initialize()');

	        this.render();

	        this._audit();
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

	        this.el.append(node);
	    },

	    //
	    // summary:
	    //     DOCME
	    //
	    // description:
	    //     DOCME
	    //
	    cancel : function(e) {
	    	if (e) {
	    		e.preventDefault();
	    	}

	    	Step(
	    		function hide() {
	    			logger.log(_name, "Hide Hogwarts ...");

	    			node.fadeOut('slow', this);
	    		},
	    		function destroy() {
	    			logger.log(_name, "Cancel - Destroy Hogwarts ...");

	    			node.empty().remove();
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
	    previous : function(e) {
	    	if (e) {
	    		e.preventDefault();
	    	}

            

	    	logger.log(_name, 'Previous student ...');
	    },

	    //
	    // summary:
	    //     DOCME
	    //
	    // description:
	    //     DOCME
	    //
	    next : function(e) {
	    	if (e) {
	    		e.preventDefault();
	    	}

	    	logger.log(_name, 'Next student ...');
	    }
    });

    return HogwartsView;
});