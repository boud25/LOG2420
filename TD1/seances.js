/**
 * Created by julien on 1/8/16.
 */

var app = angular.module('menuApp', []);
    app.controller('menuController', function($scope, $http) {

        $http.get("menu.json")
            .then(function(response) {$scope.menuList = response.data.Navigation;})
    });