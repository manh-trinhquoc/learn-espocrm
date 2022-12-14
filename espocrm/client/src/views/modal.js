/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2022 Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko
 * Website: https://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

define('views/modal', 'view', function (Dep) {

    return Dep.extend({

        cssName: 'modal-dialog',

        className: 'dialog',

        header: false,

        headerHtml: null,

        dialog: null,

        containerSelector: null,

        scope: null,

        backdrop: 'static',

        buttonList: [],

        dropdownItemList: [],

        // TODO remove it as deprecated.
        buttons: [],

        width: false,

        fitHeight: false,

        escapeDisabled: false,

        isDraggable: false,

        isCollapsable: false,

        isCollapsed: false,

        events: {
            'click .action': function (e) {
                Espo.Utils.handleAction(this, e);
            },
            'click [data-action="collapseModal"]': function () {
                this.collapse();
            },
        },

        init: function () {
            var id = this.cssName + '-container-' + Math.floor((Math.random() * 10000) + 1).toString();
            var containerSelector = this.containerSelector = '#' + id;

            this.header = this.options.header || this.header;
            this.headerHtml = this.options.headerHtml || this.headerHtml;
            this.$header = this.options.$header || this.$header;

            if (this.options.headerText) {
                this.headerHtml = Handlebars.Utils.escapeExpression(this.options.headerText);
            }

            this.options = this.options || {};

            this.backdrop = this.options.backdrop || this.backdrop;

            this.setSelector(this.containerSelector);

            this.buttonList = this.options.buttonList || this.buttonList;
            this.dropdownItemList = this.options.dropdownItemList || this.dropdownItemList;

            this.buttonList = Espo.Utils.cloneDeep(this.buttonList);
            this.dropdownItemList = Espo.Utils.cloneDeep(this.dropdownItemList);

            // TODO remove it as deprecated
            this.buttons = Espo.Utils.cloneDeep(this.buttons);

            this.on('render', () => {
                if (this.dialog) {
                    this.dialog.close();
                }

                this.isCollapsed = false;

                $(containerSelector).remove();

                $('<div />').css('display', 'none').attr('id', id).addClass('modal-container').appendTo('body');

                var modalBodyDiffHeight = 92;

                if (this.getThemeManager().getParam('modalBodyDiffHeight') !== null) {
                    modalBodyDiffHeight = this.getThemeManager().getParam('modalBodyDiffHeight');
                }

                let headerHtml = this.headerHtml || this.header;

                if (this.$header && this.$header.length) {
                    headerHtml = this.$header.get(0).outerHTML;
                }

                this.dialog = new Espo.Ui.Dialog({
                    backdrop: this.backdrop,
                    header: headerHtml,
                    container: containerSelector,
                    body: '',
                    buttonList: this.getDialogButtonList(),
                    dropdownItemList: this.getDialogDropdownItemList(),
                    width: this.width,
                    keyboard: !this.escapeDisabled,
                    fitHeight: this.fitHeight,
                    draggable: this.isDraggable,
                    className: this.className,
                    bodyDiffHeight: modalBodyDiffHeight,
                    footerAtTheTop: this.getThemeManager().getParam('modalFooterAtTheTop'),
                    fullHeight: !this.noFullHeight && this.getThemeManager().getParam('modalFullHeight'),
                    screenWidthXs: this.getThemeManager().getParam('screenWidthXs'),
                    fixedHeaderHeight: this.fixedHeaderHeight,
                    closeButton: !this.noCloseButton,
                    collapseButton: this.isCollapsable,
                    onRemove: () => {
                        this.onDialogClose();
                    },
                });

                this.setElement(containerSelector + ' .body');
            });

            this.on('after:render', () => {
                $(containerSelector).show();

                this.dialog.show();

                if (this.fixedHeaderHeight && this.flexibleHeaderFontSize) {
                    this.adjustHeaderFontSize();
                }
            });

            this.once('remove', () => {
                if (this.dialog) {
                    this.dialog.close();
                }

                $(containerSelector).remove();
            });
        },

        getDialogButtonList: function () {
            var buttonListExt = [];

            // TODO remove it as deprecated
            this.buttons.forEach((item) => {
                var o = Espo.Utils.clone(item);

                if (!('text' in o) && ('label' in o)) {
                    o.text = this.getLanguage().translate(o.label);
                }

                buttonListExt.push(o);
            });


            this.buttonList.forEach((item) => {
                var o = {};

                if (typeof item === 'string') {
                    o.name = item;
                } else if (typeof item === 'object') {
                    o = item;
                } else {
                    return;
                }

                var text = o.text;

                if (!o.text) {
                    if ('label' in o) {
                        o.text = this.translate(o.label, 'labels', this.scope);
                    } else {
                        o.text = this.translate(o.name, 'modalActions', this.scope);
                    }
                }

                o.onClick = o.onClick || (
                    this['action' + Espo.Utils.upperCaseFirst(o.name)] || function () {}
                ).bind(this);

                buttonListExt.push(o);
            });

            return buttonListExt;
        },

        getDialogDropdownItemList: function () {
            var dropdownItemListExt = [];

            this.dropdownItemList.forEach((item) => {
                var o = {};

                if (typeof item === 'string') {
                    o.name = item;
                } else if (typeof item === 'object') {
                    o = item;
                } else {
                    return;
                }

                var text = o.text;

                if (!o.text) {
                    if ('label' in o) {
                        o.text = this.translate(o.label, 'labels', this.scope)
                    } else {
                        o.text = this.translate(o.name, 'modalActions', this.scope);
                    }
                }

                o.onClick = o.onClick || (
                    this['action' + Espo.Utils.upperCaseFirst(o.name)] || function () {}
                ).bind(this);

                dropdownItemListExt.push(o);
            });

            return dropdownItemListExt;
        },

        updateDialog: function () {
            if (!this.dialog) {
                return;
            }

            this.dialog.buttonList = this.getDialogButtonList();
            this.dialog.dropdownItemList = this.getDialogDropdownItemList();
        },

        onDialogClose: function () {
            if (!this.isBeingRendered() && !this.isCollapsed) {
                this.trigger('close');
                this.remove();
            }
        },

        actionCancel: function () {
            this.trigger('cancel');
            this.dialog.close();
        },

        actionClose: function () {
            this.trigger('cancel');
            this.dialog.close();
        },

        close: function () {
            this.dialog.close();
        },

        disableButton: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.disabled = true;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').addClass('disabled').attr('disabled', 'disabled');
        },

        enableButton: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.disabled = false;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').removeClass('disabled').removeAttr('disabled');
        },

        addButton: function (o, position, doNotReRender) {
            var index = -1;

            this.buttonList.forEach((item, i) => {
                if (item.name === o.name) {
                    index = i;
                }
            });

            if (~index) {
                return;
            }

            if (position === true) {
                this.buttonList.unshift(o);
            }
            else if (typeof position === 'string') {
                index = -1;

                this.buttonList.forEach((item, i) => {
                    if (item.name === position) {
                        index = i;
                    }
                });

                if (~index) {
                    this.buttonList.splice(index, 0, o);
                } else {
                    this.buttonList.push(o);
                }
            }
            else {
                this.buttonList.push(o);
            }

            if (!doNotReRender && this.isRendered()) {
                this.reRenderFooter();
            }
        },

        addDropdownItem: function (o, toBeginning, doNotReRender) {
            var method = toBeginning ? 'unshift' : 'push';

            if (!o) {
                this.dropdownItemList[method](false);

                return;
            }

            var name = o.name;

            if (!name) {
                return;
            }

            for (var i in this.dropdownItemList) {
                if (this.dropdownItemList[i].name === name) {
                    return;
                }
            }

            this.dropdownItemList[method](o);

            if (!doNotReRender && this.isRendered()) {
                this.reRenderFooter();
            }
        },

        reRenderFooter: function () {
            if (!this.dialog) {
                return;
            }

            this.updateDialog();

            var html = this.dialog.getFooterHtml();

            this.$el.find('footer.modal-footer').html(html);

            this.dialog.initButtonEvents();
        },

        removeButton: function (name, doNotReRender) {
            var index = -1;

            this.buttonList.forEach((item, i) => {
                if (item.name === name) {
                    index = i;
                }
            });

            if (~index) {
                this.buttonList.splice(index, 1);
            }

            for (var i in this.dropdownItemList) {
                if (this.dropdownItemList[i].name === name) {
                    this.dropdownItemList.splice(i, 1);

                    break;
                }
            }

            if (this.isRendered()) {
                this.$el.find('.modal-footer [data-name="'+name+'"]').remove();
            }

            if (!doNotReRender && this.isRendered()) {
                this.reRender();
            }
        },

        showButton: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = false;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').removeClass('hidden');
        },

        hideButton: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = true;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').addClass('hidden');
        },

        showActionItem: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = false;
            });

            this.dropdownItemList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = false;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').removeClass('hidden');
            this.$el.find('footer li > a[data-name="'+name+'"]').parent().removeClass('hidden');

            if (!this.isDropdownItemListEmpty()) {
                this.$el.find('footer .main-btn-group > .btn-group').removeClass('hidden');
            }
        },

        hideActionItem: function (name) {
            this.buttonList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = true;
            });
            this.dropdownItemList.forEach((d) => {
                if (d.name !== name) {
                    return;
                }

                d.hidden = true;
            });

            if (!this.isRendered()) {
                return;
            }

            this.$el.find('footer button[data-name="'+name+'"]').addClass('hidden');
            this.$el.find('footer li > a[data-name="'+name+'"]').parent().addClass('hidden');

            if (this.isDropdownItemListEmpty()) {
                this.$el.find('footer .main-btn-group > .btn-group').addClass('hidden');
            }
        },

        isDropdownItemListEmpty: function () {
            if (this.dropdownItemList.length === 0) {
                return true;
            }

            var isEmpty = true;

            this.dropdownItemList.forEach((item) => {
                if (!item.hidden) {
                    isEmpty = false;
                }
            });

            return isEmpty;
        },

        adjustHeaderFontSize: function (step) {
            step = step || 0;

            if (!step) this.fontSizePercentage = 100;

            var $titleText = this.$el.find('.modal-title > .modal-title-text');

            var containerWidth = $titleText.parent().width();

            var textWidth = 0;

            $titleText.children().each((i, el) => {
                textWidth += $(el).outerWidth(true);
            });

            if (containerWidth < textWidth) {
                if (step > 5) {
                    var $title = this.$el.find('.modal-title');

                    $title.attr('title', $titleText.text());
                    $title.addClass('overlapped');

                    $titleText.children().each((i, el) => {
                       $(el).removeAttr('title');
                    });

                    return;
                }

                var fontSizePercentage = this.fontSizePercentage -= 4;

                this.$el.find('.modal-title .font-size-flexible').css('font-size', this.fontSizePercentage + '%');

                this.adjustHeaderFontSize(step + 1);
            }
        },

        collapse: function () {
            this.beforeCollapse().then(data => {
                if (!this.getParentView()) {
                    throw new Error("Can't collapse w/o parent view.");
                }

                this.isCollapsed = true;

                data = data || {};

                let title;

                if (data.title) {
                    title = data.title;
                }
                else {
                    let $title = this.$el.find('.modal-header .modal-title .modal-title-text');

                    if ($title.children().length) {
                        $title.children()[0];
                    }

                    title = $title.text();
                }

                let key = this._path.split('/').pop();

                this.dialog.close();

                let masterView = this;

                while (masterView.getParentView()) {
                    masterView = masterView.getParentView();
                }

                this.getParentView().unchainView(key);

                (new Promise(resolve => {
                    if (masterView.hasView('collapsedModalBar')) {
                        resolve(masterView.getView('collapsedModalBar'));

                        return;
                    }

                    masterView
                        .createView('collapsedModalBar', 'views/collapsed-modal-bar', {
                            el: 'body > .collapsed-modal-bar',
                        })
                        .then(view => resolve(view));
                }))
                .then(barView => {
                    barView.addModalView(this, {title: title});
                });
            });
        },

        beforeCollapse: function () {
            return new Promise(resolve => resolve());
        },
    });
});
