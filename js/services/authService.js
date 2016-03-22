angular.module('myApp').service('Authorization', ['$state',
function($state) {
  this.authorized = (localStorage.getItem('yourTokenKey')==null)?false:true;
  this.memorizedState = null;
  this.userInfo = (localStorage.getItem('userInfo')== null)?{}:JSON.parse(localStorage.getItem('userInfo'));
  var
  clear = function() {
    console.log("logged out");
    this.authorized = false;
    this.memorizedState = null;
    this.userInfo = {};
    localStorage.removeItem('yourTokenKey');
    localStorage.removeItem('userInfo');
    $state.go('shop.men');
  },

  go = function(fallback) {
    this.authorized = true;
    var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    userInfo:this.userInfo,
    clear: clear,
    go: go
  };
}
]);
