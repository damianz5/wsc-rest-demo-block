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

    var CLASS_HIDDEN = 'ezs-is-hidden';

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
            this.after('photosChange', this.render, this);
        },

        render: function () {
            var container = this.get('container'),
                photos = this.get('photos');

            container.setHTML(this.template({
                photos: photos
            }));

            container.toggleClass(CLASS_HIDDEN, !photos.length);

            return this;
        }
    }, {
        ATTRS: {
            photos: {
                value: []
            }
        }
    });
});
