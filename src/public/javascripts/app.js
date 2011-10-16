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
    'app/views/workspace',
    'app/helpers/firefighter',
    'app/config',
    'vendor/framework',
],
function(User, WorkspaceView, firefighter, configuration) {

    var _name = 'App';

    //
    // Init the firefighter which handles all exceptions.
    //
    firefighter.alarm();

    //
    // Grab the current logged in user from the backend.
    //
    var user = new User();

    //
    // Booting the application.
    //
    Step(
        function grabUser() {
            user.grab(this);
        },
        function renderWorkspace() {
            var workspace = new WorkspaceView({
                el: configuration.nodes.root,
                user: user
            });
        }
    );
});