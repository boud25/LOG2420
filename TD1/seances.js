/**
 * Created by julien on 1/8/16.
 */

var menuApp = angular.module('menuApp', []);
    menuApp.controller('menuController', function($scope, $http) {

        $http.get("menu.json")
            .then(function(response) {$scope.menuList = response.data.Navigation;})

    });

var seanceApp = angular.module('seanceApp', []);
    seanceApp.controller('seanceController', function($scope, $http) {

        $http.get("seances.json")
            .then(function (response) {
                $scope.seanceList = response.data;})
    });