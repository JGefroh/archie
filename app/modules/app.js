(function () {
  var analyticsProvider = '{!analytics_provider!}';

  angular
    .module('archie',
    [
        'ui.router',
        'archie.cache',
        'archie.home',
        'archie.vertical-scaling'

    ])
    .constant('baseImagePath', '/images/')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('archie', {
             url: '',
             template: '<div data-ui-view></div>',
         })
         .state('archie-home_if_no_slash', { //[JG] Fixes blank screen when refreshing on home page
             url: '/',
             template: '<div data-ui-view></div>',
         });
    }])
    .controller('ApplicationController', ['$rootScope', '$state', '$anchorScroll', '$interval', '$timeout', '$q', ApplicationController]);

    function ApplicationController($rootScope, $state, $anchorScroll, $interval, $timeout, $q) {
      var vm = this;
    }
})();
