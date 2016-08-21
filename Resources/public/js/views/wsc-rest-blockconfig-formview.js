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
        CLASS_HIDDEN = 'ezs-is-hidden',
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
            this._albumSelectorTarget = null;
            this._clearSelectedPhotos = true;
            this.events = Y.merge(this.events, EVENTS);

            this.get('container').addClass(this._generateViewClassName(Y.eZS.BlockPopupFormView.NAME));

            this.on('*:selectedPhotosChange', this._updateSelectedPhotoFieldValue, this);
            this.after('selectedAlbumIdChange', this._getPhotos, this);
            this.after('photosChange', this._renderPhotosPreview, this);
        },

        _render: function () {
            this.constructor.superclass._render.apply(this, arguments);

            this.get('container')
                .one(SELECTOR_ALBUM_PREVIEW)
                .setHTML(this.get('photosSelectorView').render().get('container'));
        },

        _renderFields: function () {
            this.constructor.superclass._renderFields.apply(this, arguments);

            var selectedPhotosField,
                albumIdField,
                selectedPhotosFieldValue;

            this.get('formFieldViews').forEach(function (field) {
                if (field.get('id') === 'selectedPhotos') {
                    selectedPhotosField = field;
                    selectedPhotosFieldValue = field.get('values');
                } else if (field.get('id') === 'albumId') {
                    albumIdField = field;
                }
            });

            selectedPhotosField.get('container').addClass(CLASS_HIDDEN);

            this.set('selectedPhotosField', selectedPhotosField);

            if (selectedPhotosFieldValue.length) {
                this._clearSelectedPhotos = false;
                this._disableAlbumIdSelector();
                this.get('photosSelectorView').set('selectedPhotos', selectedPhotosFieldValue);
                this.set('selectedAlbumId', albumIdField.get('values')[0]);
            }
        },

        _disableAlbumIdSelector: function () {
            var selector = this.get('container').one(SELECTOR_ALBUM);

            selector.setAttribute('disabled', 'disabled');

            this._albumSelectorTarget = selector;
        },

        _getPhotos: function (event) {
            if (this._clearSelectedPhotos) {
                this.get('selectedPhotosField').set('values', []);
            }

            this.fire('getAlbumPhotos', {albumId: event.newVal});
        },

        _setSelectedAlbum: function (event) {
            this.set('selectedAlbumId', event.currentTarget.get('value'));
            this._disableAlbumIdSelector();
        },

        _renderPhotosPreview: function () {
            var photosSelector = this.get('photosSelectorView');

            photosSelector.set('photos', this.get('photos'));

            if (!this._clearSelectedPhotos) {
                photosSelector.selectPhotos();
            }

            this._albumSelectorTarget.removeAttribute('disabled');
            this._albumSelectorTarget = null;
            this._clearSelectedPhotos = true;
        },

        _updateSelectedPhotoFieldValue: function (event) {
            this.get('selectedPhotosField').set('values', event.newVal);
        }
    }, {
        ATTRS: {
            selectedAlbumId: {},

            selectedPhotosField: {},

            photos: {},

            photosSelectorView: {
                valueFn: function () {
                    return new Y.wsc.PhotosSelectorView({bubbleTargets: this});
                }
            }
        }
    });
});
