(function() {
  'use strict';
  angular
    .module('archie.load-balancer')
    .controller('LoadBalancerController', ['$interval', '$timeout', '$q', Controller]);

    function Controller($interval, $timeout, $q) {
      var vm = this;
      vm.nodes = [
        {
          ip: '193.244.233.1',
          receiving: true,
          up: true,
          version: 1
        },
        {
          ip: '193.244.233.2',
          receiving: true,
          up: true,
          version: 1
        },
        {
          ip: '193.244.233.3',
          receiving: true,
          up: true,
          version: 1
        },
        {
          ip: '193.244.233.4',
          receiving: false,
          up: true,
          version: 1
        }
      ];

      vm.getWith = function(collection, field, value) {
        var matches = [];
        angular.forEach(collection, function(node) {
          if (node[field] == value) {
            matches.push(node);
          }
        });
        return matches;
      };

      vm.calculateRequestsReceived = function(node) {
        if (!node.receiving) {
          return 0;
        }
        var receivingNodes = vm.getWith(vm.nodes, 'receiving', true);
        if (!receivingNodes.length) {
          return 0;
        }
        return (100 / receivingNodes.length).toFixed(2);
      }

      vm.calculateRequestsDropped = function(node) {
        if (!node.receiving || !node.up) {
          return 0;
        }
        var receivingNodes = vm.getWith(vm.nodes, 'receiving', true);
        receivingNodes = vm.getWith(receivingNodes, 'up', true);
        if (!receivingNodes.length) {
          return 0;
        }
        return (100 / receivingNodes.length).toFixed(2);
      }

      vm.start = function(node) {
        node.receiving = true;
      }

      vm.stop = function(node) {
        node.receiving = false;
      };

      vm.upgrade = function(node) {
        node.up = false;
        node.updating = true;
        $timeout(function() {
          node.version++;
          node.up = true;
          node.updating = false;
        }, 5000);
      }
    }
})();
