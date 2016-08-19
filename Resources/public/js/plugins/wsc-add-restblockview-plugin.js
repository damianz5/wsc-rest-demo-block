/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-add-restblockview-plugin', function (Y) {
    'use strict';

    /**
     * Provides a plugin to add the REST block to landing page creator
     *
     * @module wsc-add-restblockview-plugin
     */
    Y.namespace('wsc.Plugin');

    var VIEW_NAME = 'addRestBlockPlugin';

    /**
     * Adds the REST block view to landing page creator view
     *
     * @namespace wsc.Plugin
     * @class AddRestBlock
     * @constructor
     * @extends Plugin.Base
     */
    Y.wsc.Plugin.AddRestBlock = Y.Base.create(VIEW_NAME, Y.Plugin.Base, [], {
        initializer: function () {
            this.get('host').addBlock('restdemo', Y.wsc.RestBlockView);
        },
    }, {
        NS: VIEW_NAME
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.wsc.Plugin.AddRestBlock,
        [
            'landingPageCreatorView',
            'dynamicLandingPageCreatorView',
            'dynamicLandingPageEditorView'
        ]
    );
});
