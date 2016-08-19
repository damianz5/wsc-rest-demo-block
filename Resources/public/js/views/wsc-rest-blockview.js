/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-rest-blockview', function (Y) {
    'use strict';

    /**
     * Provides the REST Block view class
     *
     * @module wsc-rest-blockview
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
             * Block edit form view instance {{#crossLink "wsc.RestBlockConfigFormView"}}wsc.RestBlockConfigFormView{{/crossLink}}
             *
             * @attribute editForm
             * @type Y.View
             * @default wsc.RestBlockConfigFormView
             */
            editForm: {
                valueFn: function () {
                    return new Y.wsc.RestBlockConfigFormView();
                }
            }
        }
    });
});
