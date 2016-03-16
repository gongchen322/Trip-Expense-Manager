(function() {

    var costController = function ($scope,$http,$state,dataService) {
      $scope.name="";
      $scope.description="";
      $scope.money="";
      $scope.total = 0;
      $scope.population = 0;
      $scope.average = 0;
      $scope.individualCosts={};
      $scope.records=[];
      $scope.needToPay = 0;
      $scope.setData = (function bar() {
       var req = {
            method: 'GET',
            url: '/data',
      }; 
      $http(req).success(function(data, status) {
          console.log("Set Data");
          $scope.records = data;
          console.log($scope.records);
          $scope.total = 0;
          for(var i=0;i<$scope.records.length;i++) {
            $scope.total += parseInt($scope.records[i].money)
          }
          $scope.individualCosts = {};
          for(var i=0;i<$scope.records.length;i++) {
            if($scope.individualCosts[$scope.records[i].name]!=null)
              $scope.individualCosts[$scope.records[i].name]+= parseInt($scope.records[i].money);
            else
              $scope.individualCosts[$scope.records[i].name] = parseInt($scope.records[i].money);
          }
          console.log(Object.keys($scope.individualCosts));
          $scope.population = Object.keys($scope.individualCosts).length;
          $scope.average = Math.round(($scope.total) / $scope.population);
        });  
        return bar;
      })();
      $scope.addToSystem = function () {
        //dataService.addEntry($scope.name,$scope.description,$scope.money);
        var body = {
          name: $scope.name,
          description: $scope.description,
          money: $scope.money
        };
        var req = {
              method: 'POST',
              url: '/data',
              data: JSON.stringify(body)
        }; 
        $http(req).success(function(data, status) {
          console.log("Successfully save data");
          var req = {
              method: 'GET',
              url: '/data',
          }; 
          $http(req).success(function(data, status) {
            console.log("Successfully get data");
            $scope.records = data;
            $scope.setData();
          });      
        });       
      }




    };

    costController.$inject = ['$scope','$http','$state','dataService'];

    angular.module('myApp')
      .controller('costController', costController);
    
    
}());