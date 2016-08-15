(function() {
  'use strict';
  angular
    .module('archie.vertical-scaling', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('archie.vertical-scaling', {
      url: '/vertical-scaling',
      templateUrl: 'vertical-scaling.html',
      controller: 'VerticalScalingController',
      controllerAs: 'vm'
    })
  }
})();
