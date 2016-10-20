(function(){
    'use strict';
    var app = angular.module('myapp',[]);
    app.controller('myctrl',checkIfMuch);
    checkIfMuch.$inject = ['$scope'];
    function checkIfMuch($scope){
        $scope.food = "";
        $scope.message = "";
        $scope.checkFood = function() {
            var x = $scope.food.split(',');
            x = x.filter(Boolean);
            if(x.length == 0) {
                $scope.message = "Please enter data first";
            }
            else if(x.length <= 3) {
                $scope.message = "Enjoy!";
            }
            else {
                $scope.message = "Too Much!";
            }
        };
    }

})();
