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
require([
    'app/models/user',
    'app/helpers/firefighter',
    'app/helpers/logger',
    'app/config',
    'lib/framework',
],
function(User, firefighter, logger, configuration) {

    var name = 'App';

    logger.log(name, configuration);

    // TODO: Init the exceptionhelper
    firefighter.alarm()

    var user = new User();
    user.grab();
     // TODO: Render the application view

});