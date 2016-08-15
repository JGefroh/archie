(function() {
  'use strict';
  angular
    .module('archie.horizontal-scaling')
    .controller('HorizontalScalingController', ['$interval', '$timeout', '$q', Controller]);

    function Controller($interval, $timeout, $q) {
      var vm = this;
      vm.requestsPerSecond = 0;
      vm.MEMORY_PER_REQUEST = 1;
      vm.CPU_PER_REQUEST = 0.25;
      vm.REQUESTS_PER_SECOND_MAX = 15000;
      vm.memory = 512;
      vm.cpu = 128;
      vm.successfulRequestsPerSecond = 0;
      vm.failingRequestsPerSecond = 0;
      vm.numSystems = 1;

      vm.getSystems = function() {
        return new Array(vm.numSystems);
      }

      vm.calculateMemory = function() {
        return vm.numSystems > 0 ? vm.memory * vm.numSystems : 0;
      }

      vm.calculateCPU = function() {
        return vm.numSystems > 0 ? vm.cpu * vm.numSystems : 0;
      }

      vm.calculateFailingRequestsPerSecond = function() {
        var failingRequestsDueToMemory = 0;
        var failingRequestsDueToCPU = 0;
        var overusedMemory = vm.calculateUsedMemory() - (vm.calculateMemory());
        var overusedCPU = vm.calculateUsedCPU() - (vm.calculateCPU());
        if (overusedMemory > 0) {
           failingRequestsDueToMemory = overusedMemory / vm.MEMORY_PER_REQUEST;
        }
        if (overusedCPU > 0) {
          failingRequestsDueToCPU = overusedCPU / vm.CPU_PER_REQUEST;
        }
        return Math.max(0, failingRequestsDueToCPU, failingRequestsDueToMemory);
      }


      vm.calculateSuccessfulRequestsPercentage = function() {
        if (vm.calculateFailingRequestsPerSecond() <= 0) {
          return 100;
        }
        return ((vm.calculateSuccessfulRequestsPerSecond() / vm.requestsPerSecond) * 100)
      }
      vm.calculateSuccessfulRequestsPerSecond = function() {
        return (Math.abs(vm.requestsPerSecond - vm.calculateFailingRequestsPerSecond()));
      };

      vm.calculateUsedMemory = function() {
        return vm.requestsPerSecond * vm.MEMORY_PER_REQUEST;
      }

      vm.calculateUsedCPU = function() {
        return vm.requestsPerSecond * vm.CPU_PER_REQUEST;
      }
    }
})();
