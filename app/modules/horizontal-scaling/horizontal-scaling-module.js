(function() {
  'use strict';
  angular
    .module('archie.horizontal-scaling', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('archie.horizontal-scaling', {
      url: '/horizontal-scaling',
      templateUrl: 'horizontal-scaling.html',
      controller: 'HorizontalScalingController',
      controllerAs: 'vm'
    })
  }
})();
