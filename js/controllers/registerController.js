angular.module('myApp').controller('registerController', ['$scope','$http', 
  function ($scope, $http) {
      $scope.name = "";
      $scope.email = "";
      $scope.password = "";

      $scope.signup= function () {
          var body={      
                name: $scope.name,
                email:$scope.email,
                password:$scope.password       
        };
         $http.post("/users", JSON.stringify(body)).success(function(data, status) {
            console.log("Successful signup");         
        }).error(function(data, status) {
             alert("Bad Sign Up username or password!")
          })
      }
  }
]);