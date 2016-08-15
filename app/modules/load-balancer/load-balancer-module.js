(function() {
  'use strict';
  angular
    .module('archie.load-balancer', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('archie.load-balancer', {
      url: '/load-balancer',
      templateUrl: 'load-balancer.html',
      controller: 'LoadBalancerController',
      controllerAs: 'vm'
    });
  }
})();
