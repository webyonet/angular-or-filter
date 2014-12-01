; (function (app) {

    app.controller("someCtrl", [
        "$scope","$filter", function ($scope, $filter) {
            $scope.arr = [{ name: "ali", gender: false }, { name: "gizem", gender: true }, { name: "veli", gender: false }, { name: "nehir", gender: true }];
            $scope.number = [1, 2, 3, 4, 5, "5"];
            $scope.str = ["a", "b", "c", "d", "e", 1];

            $scope.filtered = function() {
              return  $filter('orFilter')($scope.arr, { name: 'ali', gender: false }, true);
            };


        }
    ]);


})(angular.module('app', ['or-filter']));