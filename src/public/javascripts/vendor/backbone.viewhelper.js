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
_.extend(Backbone.View.prototype, {
    
    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    addReferences : function(nodes) {
        for (var item in nodes) {
            this['$' + item] = $(nodes[item], this.el);
        }
    }
});