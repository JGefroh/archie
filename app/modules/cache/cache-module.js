(function() {
  'use strict';
  angular
    .module('archie.cache', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('archie.cache', {
      url: '/cache',
      templateUrl: 'cache.html',
      controller: 'CacheController',
      controllerAs: 'vm'
    });
  }
})();
