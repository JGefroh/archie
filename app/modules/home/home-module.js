(function() {
  'use strict';
  angular
    .module('archie.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('home', {
      url: '',
      templateUrl: 'home.html'
    }).state('home-none', {
      url: '/',
      templateUrl: 'home.html'
    })
  }
})();
