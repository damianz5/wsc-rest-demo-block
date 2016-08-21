/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-rest-blockview-serviceplugin', function (Y) {
    'use strict';

    /**
     * Provides the REST Block View Service Plugin class
     *
     * @module wsc-rest-blockview-serviceplugin
     */
    Y.namespace('wsc.Plugin');

    var PLUGIN_NAME = 'restBlockViewServicePlugin',
        ENDPOINT_URL = 'http://jsonplaceholder.typicode.com';

    /**
     * The StudioUI REST block config form view
     *
     * @namespace wsc.Plugin
     * @class RestBlockViewService
     * @constructor
     * @extends eZ.Plugin.ViewServiceBase
     */
    Y.wsc.Plugin.RestBlockViewService = Y.Base.create(PLUGIN_NAME, Y.eZ.Plugin.ViewServiceBase, [], {
        initializer: function () {
            this.onHostEvent('*:getAlbumPhotos', this._getPhotos, this);
        },

        _getPhotos: function (event) {
            Y.io(ENDPOINT_URL + '/albums/' + event.albumId + '/photos', {
                on: {
                    success: function (id, xhr) {
                        event.target.set('photos', JSON.parse(xhr.response));
                    },

                    failure: function () {
                        this.get('host').fire('notify', {
                            notification: {
                                text: 'Cannot load photos for album: ' + event.albumId,
                                identifier: 'load-photos-error-' + event.albumId,
                                state: 'error',
                                timeout: 0
                            }
                        });
                    }.bind(this)
                }
            });
        }
    }, {
        NS: PLUGIN_NAME
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.wsc.Plugin.RestBlockViewService,
        [
            'landingPageCreatorViewService',
            'dynamicLandingPageCreatorViewService',
            'dynamicLandingPageEditorViewService'
        ]
    );
});
