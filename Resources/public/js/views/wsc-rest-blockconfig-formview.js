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

    var EVENTS = {},
        SELECTOR_ALBUM = '[id*="-albumid"]',
        SELECTOR_ALBUM_PREVIEW = '.wsc-rest-blockview__album-preview';

    EVENTS[SELECTOR_ALBUM] = {'valuechange': '_setSelectedAlbum'};

    /**
     * The StudioUI REST block config form view
     *
     * @namespace wsc
     * @class RestBlockConfigFormView
     * @constructor
     * @extends eZS.BlockPopupFormView
     */
    Y.wsc.RestBlockConfigFormView = Y.Base.create('restBlockConfigFormView', Y.eZS.BlockPopupFormView, [], {
        initializer: function () {
            this._tempTarget = null;
            this.events = Y.merge(this.events, EVENTS);

            this.get('container').addClass(this._generateViewClassName(Y.eZS.BlockPopupFormView.NAME));

            this.on('selectedAlbumIdChange', this._getPhotos, this);
            this.after('photosChange', this._renderPhotosPreview, this);
        },

        _render: function () {
            this.constructor.superclass._render.apply(this, arguments);

            this.get('container')
                .one(SELECTOR_ALBUM_PREVIEW)
                .setHTML(this.get('photosSelectorView').render().get('container'));
        },

        _getPhotos: function (event) {
            this.fire('getAlbumPhotos', {albumId: event.newVal});
        },

        _setSelectedAlbum: function (event) {
            this.set('selectedAlbumId', event.currentTarget.get('value'));

            event.currentTarget.setAttribute('disabled', 'disabled');

            this._tempTarget = event.currentTarget;
        },

        _renderPhotosPreview: function () {
            this.get('photosSelectorView').set('photos', this.get('photos'));

            this._tempTarget.removeAttribute('disabled');
            this._tempTarget = null;
        }
    }, {
        ATTRS: {
            selectedAlbumId: {},

            photos: {},

            photosSelectorView: {
                valueFn: function () {
                    return new Y.wsc.PhotosSelectorView({bubbleTargets: this});
                }
            }
        }
    });
});
