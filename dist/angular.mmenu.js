angular.module('angular-mmenu', [])
    .directive('mmenu', function () {
    var angularMmenuIdAttr = 'angular-mmenu-id';
    var getValue = function (scope, field) {
        if (field === undefined || field === null) {
            field = null;
        }
        else if (scope[field] !== null && scope[field] !== undefined) {
            field = scope[field];
        }
        return field;
    };
    var fillMenuItemControl = function (ctrl, menuItem) {
        var contentCtrl = null;
        if (menuItem.href === null || menuItem.href === undefined) {
            contentCtrl = $('<span />');
        }
        else {
            var href = $('<a />');
            if (typeof menuItem.href === "function") {
                href.attr('href', 'javascript:void(0);')
                    .click(function (e) {
                    e.preventDefault();
                    var proc = menuItem.href;
                    proc();
                });
            }
            else if (menuItem.href === '#' || menuItem.href === '') {
                href.attr('href', 'javascript:void(0);');
            }
            else {
                href.attr('href', menuItem.href);
            }
            contentCtrl = href;
        }
        if (angular.isString(menuItem.text)) {
            contentCtrl.text(menuItem.text);
        }
        else {
            var obj = menuItem.text;
            contentCtrl.html(obj.getText());
            var listener = obj.onTextChanged(function (newValue) {
                contentCtrl.html(newValue);
            });
            contentCtrl.data('mmenu-dynamic-text', obj)
                .data('mmenu-dynamic-text-listener', listener);
            contentCtrl.on("remove", function () {
                var handler = contentCtrl.data('mmenu-dynamic-text');
                if (handler === null || handler === undefined) {
                    return null;
                }
                var currListener = contentCtrl.data('mmenu-dynamic-text-listener');
                handler.detachHandler(currListener);
            });
        }
        ctrl.append(contentCtrl);
        if (menuItem.items !== null && menuItem.items !== undefined &&
            angular.isArray(menuItem.items) && menuItem.items.length > 0) {
            var root = $('<ul />');
            menuItem.items.forEach(function (x) {
                renderMenuItem(root, x);
            });
            ctrl.append(root);
        }
    };
    var renderMenuItem = function (rootControl, menuItem) {
        var menuItemControl = $('<li/>');
        if (menuItem !== null && menuItem !== undefined) {
            fillMenuItemControl(menuItemControl, menuItem);
            if (menuItem.$class !== null && menuItem.$class !== undefined) {
                menuItemControl.addClass(menuItem.$class);
            }
        }
        rootControl.append(menuItemControl);
    };
    var recreateMenu = function (scope, attrs) {
        var id = attrs.mmenuId;
        if (id === null || id === undefined || id === '') {
            console.warn('No angular-mmenu id is specified');
            return;
        }
        var newMenu = null;
        var existingMmenu = null;
        var jElement = $('[' + angularMmenuIdAttr + '=' + id + ']');
        if (jElement.length === 0) {
            console.warn('No angular-mmenu host was found');
            return;
        }
        var value = scope[attrs.mmenuItems];
        if (value === null || value === undefined) {
            value = new Array();
        }
        if (jElement[0].localName === 'nav') {
            jElement.empty();
            existingMmenu = jElement.data('mmenu');
            newMenu = jElement;
        }
        else {
            newMenu = $('<nav id="' + id + '" />');
        }
        var menu = $('<ul />');
        newMenu.append(menu);
        value.forEach(function (x) {
            renderMenuItem(menu, x);
        });
        if (existingMmenu === null || existingMmenu === undefined) {
            var newMenuElement = angular.element(newMenu);
            var oldMenuElement = angular.element(jElement);
            oldMenuElement.replaceWith(newMenuElement);
            var opts = getValue(scope, attrs.mmenuOptions);
            var params = getValue(scope, attrs.mmenuParams);
            console.log('mmenu', id, opts, params);
            newMenu.attr(angularMmenuIdAttr, id);
            $(document).ready(function () {
                newMenu.mmenu(opts, params);
            });
        }
        else if (existingMmenu._init != null && existingMmenu._init !== undefined) {
            existingMmenu._init();
        }
        else if (existingMmenu.init != null && existingMmenu.init !== undefined) {
            existingMmenu.init(menu);
        }
        else {
            console.error('angular mmenu could not be reinitialized due to missing init api method.');
        }
    };
    var linker = function (id, scope, attrs) {
        if (attrs.mmenuInvalidate !== null && attrs.mmenuInvalidate !== undefined && attrs.mmenuInvalidate !== '') {
            scope[attrs.mmenuInvalidate] = function () { recreateMenu(scope, attrs); };
        }
        scope.$watchCollection(attrs.mmenuItems, function (value) {
            recreateMenu(scope, attrs);
        });
    };
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            if (attrs.mmenuItems == null || attrs.mmenuItems == undefined) {
                console.warn('mmenu-items attribute is not specified. No MMenu is created.');
                element.remove();
                return;
            }
            if (attrs.mmenuId == null || attrs.mmenuId == undefined) {
                console.warn('mmenu-id attribute is not specified. No MMenu is created.');
                element.remove();
                return;
            }
            element.attr(angularMmenuIdAttr, attrs.mmenuId);
            linker(attrs.mmenuId, scope, attrs);
        }
    };
});
//# sourceMappingURL=angular.mmenu.js.map