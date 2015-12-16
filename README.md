# Angular.MMenu directive

AngularJS directive for JQuery.MMenu plugin

Usage:

  - download [angular.mmenu.js] or [angular.mmenu.min.js] 
  - add link to the script file into your html file
  - add _angular-mmenu_ module to your application 
  - add **mmenu** tag into your html
  - magic!
  
Dependencies:

  - [jQuery] v1.11.3
  - [jQuery.MMenu] v4.2.0
  - [AngularJS] v1.4.8

> NB! There're no strong version dependencies, but this code was tested just on these versions of 3-d part libraries

## Version
0.1.0

## Code example

index.html:
```html
<!DOCTYPE html>
<html data-ng-app="myApp">
<head>
    <title>Angular.MMenu</title>
    <link href="css/jquery.mmenu.all.css" rel="stylesheet" type="text/css" />
</head>
<body ng-controller="myController">
    <mmenu mmenu-id="main-menu" mmenu-items="mainMenuItems"></mmenu>


    <a href="#main-menu">open menu</a>

    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/jquery.mmenu.min.all.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/angular.mmenu.min.js"></script>
    
    <script src="js/app.js"></script>
</body>
</html>
```

js/app.js:
```js
var app = angular.module('myApp', ['angular-mmenu']);
app.controller('myController', function ($scope) {
    $scope.mainMenuItems = [
        { href: '/', text: 'Main' },
        {
            text: 'Available Parameters', items: [
                {
                    text: 'mandatory',
                    items: [
                        { text: 'mmenu-id' },
                        { text: 'mmenu-items' }
                    ]
                },
                {
                    text: 'optional',
                    items: [
                        { text: 'mmenu-options' },
                        { text: 'mmenu-params' },
                        { text: 'mmenu-invalidate' }
                    ]
                }
            ]
        }
    ];
});
```

## Data format

#### Menu item structure

```ts
interface IMenuItem {
    href?: string;          
    text: string;
    items?: IMenuItem[];

    class?: string;
}
```
 - **href** - link to be used by menu item. If not specified or contains empty string ('') <span /> will be generated instead of <a />.
 - **text** - _[Mandatory]_ text to be displayed by menu item.
 - **class** - class to be added to <li /> items, that represents current menu item
 - **items** - array of subitems of current menu item
 
##### <mmenu /> parameters
 - **mmenu-id** - _[Mandatory]_ identifier of mmenu element
 - **mmenu-items** - _[Mandatory]_ name of property in current [$scope] that contains array of menu items
 - **mmenu-options** - name of property in current [$scope] that contains mmenu creation [options]
 - **mmenu-params** - name of property in current [$scope] that contains mmenu creation [parameters]
 - **mmenu-invalidate** - name of property in current [$scope] that will contain mmenu invalidation callback. This property will be set by _angular.mmenu_ at initialization stage. After that you can call this callback when you need your menu to be completely updated.
  
 ###### callback usage example:

html:
```html
   <mmenu mmenu-id="main-menu" mmenu-items="mainMenuItems" mmenu-invalidate="updateMenu"></mmenu>
```

javascript:
```js
    // somewhere in controller's JS code
    $scope.updateMenu(); // <-- mmenu item will be recreated
```


## Development

Want to contribute? Great!

Contact me via e-mail: matafonoff@gmail.com
> NB! E-mail **MUST** have **angular.mmenu** title or it will be marked as spam!

## Todos

 - Call $scope methods instead of 
 - Add Tests
 - Add watching and recreating specifed menu panels instead of entire menu recreation
 - Add ajax-based sub-menu creation

## License
----
MIT

   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   [jQuery.MMenu]: <http://mmenu.frebsite.nl/>
   [options]: <http://mmenu.frebsite.nl/documentation/options/>   
   [parameters]: <http://mmenu.frebsite.nl/documentation/options/configuration.html>
   [$scope]: <https://docs.angularjs.org/guide/scope>
   [angular.mmenu.js]: <https://raw.githubusercontent.com/matafonoff/angular.mmenu/master/dist/angular.mmenu.js>
   [angular.mmenu.min.js]: <https://raw.githubusercontent.com/matafonoff/angular.mmenu/master/dist/angular.mmenu.min.js>


