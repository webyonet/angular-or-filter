/*
 * @name: Angularjs Or Filter
 * @type: Filter
 * @version: v1.3.4
 * @author: Burak Demirezen
 * @License: Licensed under the MIT license.
 */
; (function (module) {
    module.filter('orFilter', [
        function () {
            var keyParser = function (obj) {
                var keyList = [];
                if (angular.isObject(obj) && !angular.isArray(obj)) {
                    for (var i in obj) keyList.push(i);
                    return keyList;
                } else {
                    return obj;
                }
            },
            equals = function (obj1, obj2, type) {
                if (type) return obj1 === obj2;
                else {
                    if (angular.isString(obj1) && angular.isString(obj2))
                        return obj1.toLocaleLowerCase() == obj2.toLocaleLowerCase();
                    else
                        return obj1 == obj2;
                }
            },
            isEmpty = function (obj) {
                if (obj == null) return true;
                for (var name in obj) {
                    return false;
                }
                return true;
            }

            return function (array, expression, comparator) {
                var keys = keyParser(expression),
                    returnList = [],
                    keyIsArray = angular.isArray(keys);
                comparator = comparator || false;

                if (isEmpty(expression)) {
                    returnList = array;
                } else {
                    for (var ary in array) {
                        if (keyIsArray && !angular.isArray(expression)) {
                            for (var key in keys) {
                                if (equals(array[ary][keys[key]], expression[keys[key]], comparator)) {
                                    returnList.push(array[ary]);
                                    break;
                                }
                            }
                        } else if (keyIsArray) {
                            for (var key in keys) {
                                if (equals(keys[key], array[ary], comparator)) {
                                    returnList.push(array[ary]);
                                }
                            }
                        } else {
                            if (equals(array[ary], expression, comparator)) {
                                returnList.push(array[ary]);
                            }
                        }
                    }
                }

                return returnList;
            }
        }
    ]);
})(angular.module('or-filter', []));
