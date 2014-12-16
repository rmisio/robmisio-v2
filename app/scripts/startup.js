// miscellaneous start-up related stuff
define([
    'jquery',
    'underscore',
    'backbone',
    'backbone-validation',
    'cloudinary_js'
], function ($, _, backbone, BackboneValidation, cloudinary) {
    'use strict';

    $.cloudinary.config().cloud_name = 'dabzwws4g';
    $.cloudinary.config().upload_preset = 'ceorfqu2';

    // bootstrap modal scroll issue fix:
    // https://github.com/twbs/bootstrap/issues/9855#issuecomment-27460362
    // todo: upgrading bootstrap should fix this
    function measureScrollBar() {
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'scrollbar-measure'
        document.body.appendChild(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        return scrollbarWidth
    }

    $(document.body).on('show.bs.modal', function () {
        if (this.clientHeight <= window.innerHeight) return
        var scrollbarWidth = measureScrollBar()
        if (scrollbarWidth) $(document.body).css('padding-right', scrollbarWidth)
    }).on('hidden.bs.modal', function () {
        $(document.body).css('padding-right', 0)
    });
    // END - bootstrap modal scroll issue fix.

    // Custom backbone.validation handlers courtesy of:
    // https://gist.github.com/driehle/2909552
    // See a comment on the above linked page for the Bootstrap 3
    // version used below.
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var control = view.$('[' + selector + '=' + attr + ']'),
                group = control.parents('.form-group')
                    .removeClass('has-error')

            if (control.data('error-style') === 'tooltip') {
                // CAUTION: calling tooltip('hide') on an uninitialized tooltip
                // causes bootstraps tooltips to crash somehow...
                control.data('tooltip') && control.tooltip('hide');
            } else if (control.data('error-style') == 'inline') {
                group.find('.help-inline.error-message').remove();
            } else {
                group.find('.help-block.error-message').remove();
            }
        },
        invalid: function (view, attr, error, selector) {
            var control = view.$('[' + selector + '=' + attr + ']'),
                group = control.parents('.form-group')
                    .addClass('has-error');

            if (control.data('error-style') === 'tooltip') {
                position = control.data('tooltip-position') || 'right';
                control.tooltip({
                    placement: position,
                    trigger: 'manual',
                    title: error
                });
                control.tooltip('show');
            } else if (control.data('error-style') === 'inline') {
                if (group.find('.help-inline').length === 0 ) {
                    group.find('.form-control')
                        .after('<span class=\'help-inline error-message\'></span>');
                }
                target = group.find('.help-inline');
                target.text(error);
            } else {
                var target;

                if (group.find('.help-block').length === 0) {
                    group.find('.form-control')
                        .after('<p class=\'help-block error-message\'></p>');
                }
                target = group.find('.help-block');
                target.text(error);
            }
        }
    });
});
