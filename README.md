Angular Or Filter
========
Full text search does not supported


## Usage
## In HTML Template Binding

`{{ filter_expression | orFilter : expression : comparator}}`

## In JavaScript

`$filter('orFilter')(array, expression, comparator)`

## Arguments
| Param | Type | Details
|-------|------------|--------------------|
|array | `Array` | The source array. |
|expression | `string` `Object` `function` `number` `boolean` | The predicate to be used for selecting items from array.|
| comparator | `boolean` | Comparator which is used in determining if the expected value (from the filter expression) and actual value (from the object in the array) should be considered a match. |


## Filter Of Object List
`[{...}, {...}, {...} ...]`

`$filter('orFilter')(scope.collections.friends, {arg1, arg2, ...}, false)`

```html
<label for="name">Get Name</label>
<select id="name" ng-options="item.name for item in collections.friends" 
        ng-model="selectedItem" ng-change="filtered()"></select>
<input id="male" type="checkbox" ng-model="male" ng-change="filtered()" />
<label for="male">Or Get Male</label>
<ul>
    <li ng-repeat="item in filteredList">
        {{ item.name }} - {{ (item.gender ? 'Male' : 'Female') }}
    </li>
</ul>
<script>
; (function (app) {
    app.controller("someCtrl", [
        "$scope", "$filter", function (scope, filter) {
            scope.filteredList = [];

            scope.filtered = function () {
                var expression = {};
                if (scope.male) expression.gender = scope.male;
                if (scope.selectedItem) expression.name = scope.selectedItem.name;

                scope.filteredList = filter('orFilter')(scope.collections.friends, expression, false);
            };

            scope.pageLoad = function () {
                scope.filteredList = scope.collections.friends;
            }.call(this);
        }
    ]);

    app.run([
        "$rootScope", function (root) {
            root.collections = {};

            root.collections.friends = [
                { name: "Anna Marquez", gender: false },
                { name: "Veronica Morton", gender: false },
                { name: "Vinson Glover", gender: true },
                { name: "Parker Howard", gender: true }
            ];

            root.collections.numbers = [1, 2, 3, 4, 5, "5", "4", "3"];

            root.collections.strings = ["Craig", "Trisha", "Adeline", "Elvia", "Knight"];
        }
    ]);
})(angular.module('app', ['or-filter']));
</script>
```

## Filter of Number in Javascript

```html
<script>
    var list = [1, 2, 3, 4, 5, "5", "4", "3"];
    $scope.filteredList = filter('orFilter')(scope.collections.friends, [1, 3, 4], false);
    // return [1, 3, 4 "4", "3"]
    $scope.filteredList = filter('orFilter')(scope.collections.friends, [1, 3, 4], true);
    // return [1, 3, 4]
    $scope.filteredList = filter('orFilter')(scope.collections.friends, 1, true);
    // return [1]
</script>
```

## Filter of Number in HTML

```html
<ul>
    <li ng-repeat="item in [1, 2, 3, 4, 5, '5', '4', '3'] | orFilter: 5"> {{ item }} </li>
    <!--
        Result:
        <li>5</li>
        <li>5</li>
    -->
    <li ng-repeat="item in [1, 2, 3, 4, 5, '5', '4', '3'] | orFilter: 5: true"> {{ item }} </li>
    <!--
        Result:
        <li>5</li>
    -->
    <li ng-repeat="item in [1, 2, 3, 4, 5, '5', '4', '3'] | orFilter: [1, 4]"> {{ item }} </li>
    <!--
        Result:
        <li>1</li>
        <li>4</li>
        <li>4</li>
    -->
</ul>
```

## Filter of String in Javascript

```html
<script>
    var list = ["Craig", "Trisha", "Adeline", "Elvia", "Knight"];
    $scope.filteredList = filter('orFilter')(scope.collections.friends, ["Craig", "Trisha"]);
    // return ["Craig", "Trisha"]
    $scope.filteredList = filter('orFilter')(scope.collections.friends, "Craig");
    // return ["Craig"]
</script>
```

## Filter of String in HTML

```html     
<ul>
    <li ng-repeat="item in ['Craig', 'Trisha', 'Adeline', 'Elvia', 'Knight'] | orFilter: 'Craig'"> {{ item }} </li>
    <!--
        Result:
        <li>Craig</li>
    -->
    <li ng-repeat="item in ['Craig', 'Trisha', 'Adeline', 'Elvia', 'Knight'] | orFilter: 'craig': true"> {{ item }} </li>
    <!--
        Result:
        -- empty --
    -->
    <li ng-repeat="item in ['Craig', 'Trisha', 'Adeline', 'Elvia', 'Knight'] | orFilter: ['Craig', 'Elvia']"> {{ item }} </li>
    <!--
        Result:
        <li>Craig</li>
        <li>Elvia</li>
    -->
</ul>
```

## LICENSE - "MIT License"

Copyright (c) 2014 webyonet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
