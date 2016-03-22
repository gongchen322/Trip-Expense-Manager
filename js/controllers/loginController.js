angular.module('myApp').controller('loginController', ['$scope','$http','Authorization',
  function ($scope, $http, Authorization) {
      $scope.name = "";
      $scope.email = "";
      $scope.password = "";

      $scope.login= function () {
          var body={
                email:$scope.email1,
                password:$scope.password1        
        };
         $http.post("/users/login", JSON.stringify(body)).success(function(data, status, headers) {
            console.log("Successful login");
            Authorization.go('main.new');
    
            localStorage.setItem('yourTokenKey', headers('Auth'));
            data=JSON.stringify(data);
            localStorage.setItem('userInfo',data);
            Authorization.userInfo = JSON.parse(data);
            console.log("aaa "+Authorization.authorized);
            console.log("user info is now "+ Authorization.userInfo);
        }).error(function(data, status) {
           alert("Wrong username or password!")
          })   
      };
  }
]);