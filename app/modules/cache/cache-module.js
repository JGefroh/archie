(function() {
  'use strict';
  angular
    .module('archie.cache', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('cache', {
      url: '',
      templateUrl: 'cache.html',
      controller: 'CacheController',
      controllerAs: 'vm'
    }).state('cache-none', {
      url: '/',
      templateUrl: 'cache.html',
      controller: 'CacheController',
      controllerAs: 'vm'
    });
  }
})();
