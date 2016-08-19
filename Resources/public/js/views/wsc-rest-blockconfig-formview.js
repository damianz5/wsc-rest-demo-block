/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-rest-blockconfig-formview', function (Y) {
    'use strict';

    /**
     * Provides the REST Block Config Form view class
     *
     * @module wsc-rest-blockconfig-formview
     */
    Y.namespace('wsc');

    /**
     * The StudioUI REST block config form view
     *
     * @namespace wsc
     * @class RestBlockConfigFormView
     * @constructor
     * @extends eZS.BlockPopupFormView
     */
    Y.wsc.RestBlockConfigFormView = Y.Base.create('restBlockConfigFormView', Y.eZS.BlockPopupFormView, [], {
    });
});
