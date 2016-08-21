/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('wsc-photos-selectorview', function (Y) {
    'use strict';

    /**
     * Provides the Photos Selector view class
     *
     * @module wsc-photos-selectorview
     */
    Y.namespace('wsc');

    var CLASS_HIDDEN = 'ezs-is-hidden',
        CLASS_SELECTED = 'wsc-is-selected',
        DATA_DIRECTION = 'data-direction',
        DATA_PHOTOID = 'data-photo-id',
        DIRECTION_NEXT = 'next',
        SELECTOR_BTN = '[' + DATA_DIRECTION + ']',
        SELECTOR_PHOTOS = '.wsc-photos-selector__photos-list',
        SELECTOR_PHOTO = '.wsc-photos-selector__photo',
        EVENTS = {};

    EVENTS[SELECTOR_PHOTO] = {tap: '_togglePhotoSelection'};
    EVENTS[SELECTOR_BTN] = {tap: '_movePhotosList'};

    /**
     * The Photos Selector view
     *
     * @namespace wsc
     * @class PhotosSelectorView
     * @constructor
     * @extends eZ.TemplateBasedView
     */
    Y.wsc.PhotosSelectorView = Y.Base.create('photosSelectorView', Y.eZ.TemplateBasedView, [], {
        initializer: function () {
            this.events = EVENTS;
            this.after('photosChange', this.render, this);
            this.after('photosChange', this._updatePhotosCount, this);
        },

        render: function () {
            var container = this.get('container'),
                photos = this.get('photos');

            container.setHTML(this.template({
                photos: photos
            }));

            container.toggleClass(CLASS_HIDDEN, !photos.length);

            return this;
        },

        _togglePhotoSelection: function (event) {
            var item = event.currentTarget,
                selectedPhotos = this.get('selectedPhotos'),
                photoId = item.getAttribute(DATA_PHOTOID);

            if (item.hasClass(CLASS_SELECTED)) {
                selectedPhotos = selectedPhotos.filter(function (selectedPhotoId) {
                    return selectedPhotoId !== photoId;
                });
            } else {
                selectedPhotos.push(photoId);
            }

            item.toggleClass(CLASS_SELECTED);

            this.set('selectedPhotos', selectedPhotos);
        },

        _updatePhotosCount: function (event) {
            this.set('photosCount', event.newVal.length);
        },

        _movePhotosList: function (event) {
            var container = this.get('container'),
                visibleIndex = this.get('firstVisibleItemIndex'),
                photosCount = this.get('photosCount'),
                itemWidth = container.one(SELECTOR_PHOTO).getDOMNode().getBoundingClientRect().width,
                transform,
                nextIndex;

            if (event.currentTarget.getAttribute(DATA_DIRECTION) === DIRECTION_NEXT) {
                nextIndex = visibleIndex + 1;

                if (nextIndex < photosCount) {
                    transform = 'translateX(-' + (nextIndex * itemWidth) + 'px)';
                } else {
                    nextIndex = visibleIndex;
                }
            } else {
                nextIndex = visibleIndex - 1;

                if (nextIndex >= 0) {
                    transform = 'translateX(-' + (nextIndex * itemWidth) + 'px)';
                } else {
                    nextIndex = visibleIndex;
                }
            }

            if (transform) {
                container.one(SELECTOR_PHOTOS).setStyle('transform', transform);
            }

            this.set('firstVisibleItemIndex', nextIndex);
        },

        selectPhotos: function () {
            var container = this.get('container');

            this.get('selectedPhotos').forEach(function (photoId) {
                container.one('[' + DATA_PHOTOID + '="' + photoId + '"]').addClass(CLASS_SELECTED);
            });

            return this;
        }
    }, {
        ATTRS: {
            photos: {
                value: []
            },

            photosCount: {
                value: 0
            },

            selectedPhotos: {
                value: []
            },

            firstVisibleItemIndex: {
                value: 0
            }
        }
    });
});
