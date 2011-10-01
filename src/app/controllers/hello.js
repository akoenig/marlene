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
exports.HelloController = function(app, mw, logger) {
     
    //
    // summary:
    //     DOCME
    //
    // description:
    //     DOCME
    //
    app.get('/hello', function(req, res) {
        logger.log('Called the index route ...');

        res.render('index');
    });
};