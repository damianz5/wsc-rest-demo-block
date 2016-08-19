/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-rest-blockview', function (Y) {
    'use strict';

    /**
     * Provides the REST Block view class
     *
     * @module fb-formblockview
     */
    Y.namespace('wsc');

    /**
     * The StudioUI rest block view
     *
     * @namespace wsc
     * @class RestBlockView
     * @constructor
     * @extends eZS.BlockView
     */
    Y.wsc.RestBlockView = Y.Base.create('restBlockView', Y.eZS.BlockView, [], {
    }, {
        ATTRS: {
            viewClassName: {
                value: 'wsc.RestBlockView',
                readOnly: true
            },

            /**
             * Action menu view instance {{#crossLink "eZS.ActionMenuView"}}eZS.ActionMenuView{{/crossLink}}
             *
             * @attribute actionMenu
             * @type Y.View
             * @default eZS.ActionMenuView
             */
            actionMenu: {
                valueFn: function () {
                    return new Y.eZS.ActionMenuView();
                }
            },
        }
    });
});
