(function() {
  'use strict';
  angular
    .module('archie.cache')
    .controller('CacheController', ['$interval', '$timeout', '$q', Controller]);

    function Controller($interval, $timeout, $q) {
      var vm = this;
      vm.MAX_CACHE_LENGTH = 3;
      vm.MAX_CACHE_TTL = 10000;
      vm.CACHE_EXECUTION_TIME = 100;
      vm.STORE_EXECUTION_TIME = 200;
      vm.icons = [
        'fa-file-picture-o',
        'fa-lightbulb-o',
        'fa-file-code-o',
        'fa-bicycle',
        'fa-truck',
        'fa-book',
        'fa-eye',
        'fa-star-o',
        'fa-thumb-tack',
        'fa-shopping-cart',
        'fa-sticky-note'

      ];
      vm.store = [
        {
          id: 100,
          value: 'Picture',
          icon: 'fa-file-picture-o'
        },
        {
          id: 200,
          value: 'Lightbulb',
          icon: 'fa-lightbulb-o'
        },
        {
          id: 300,
          value: 'Document',
          icon: 'fa-file-code-o'

        },
        {
          id: 400,
          value: 'Bicycle',
          icon: 'fa-bicycle'
        },
        {
          id: 500,
          value: 'truck',
          icon: 'fa-truck'
        },
      ];
      vm.cache = [];

      vm.objects = angular.copy(vm.store);
      vm.requests = [];

      vm.removeFromCache = function(object) {
        vm.cache.splice(vm.cache.indexOf(object), 1);
      };
      vm.randomizeIcons = function() {
        angular.forEach(vm.store, function(storedObject) {
          storedObject.icon = vm.icons[Math.floor(Math.random() * vm.icons.length)]
        });
      }

      vm.addToCache = function(object) {
        if (!vm.isInCache(object)) {
          if (vm.cache.length >= vm.MAX_CACHE_LENGTH) {
            var lastUsedObject = vm.cache[0];
            angular.forEach(vm.cache, function(cached) {
              if (!cached.lastUsed || lastUsedObject.lastUsed > cached.lastUsed) {
                lastUsedObject = cached;
              }

            });
            vm.removeFromCache(lastUsedObject);
          }
          object.addedToCache = new Date();
          vm.cache.push(angular.copy(object));
        }
      }

      vm.isInCache = function(object) {
        var match;
        angular.forEach(vm.cache, function(cachedObject) {
          if (cachedObject.id == object.id) {
            match = cachedObject;
          }
        });
        return match;
      }

      vm.getData = function(id) {
        var request = {
          id: id,
          start: new Date()
        };
        vm.requests.push(request);
        getData(id).then(function(object) {
          request.end = new Date();
          if (object) {
            request.result = object;
            vm.addToCache(object);
          }
        });
      }


      function loadFromCache(id) {
        var defer = $q.defer();
        $timeout(function() {
          var match;
          angular.forEach(vm.cache, function(object) {
            if (object.id == id) {
              match = object;
            }
          });
          if (match) {
            match.lastUsed = new Date();
          }
          defer.resolve(match);
        }, vm.CACHE_EXECUTION_TIME);
        return defer.promise;
      };

      function getData(id) {
        return loadFromCache(id).then(function(object) {
          if (object) {
            object.fromCache = true;
            return angular.copy(object);
          }
          else {
            return loadFromStore(id);
          }
        });
      }

      $interval(function() {
        var now = new Date();
        var objectsToRemove = [];
        angular.forEach(vm.cache, function(cachedObject) {
          if (now - cachedObject.addedToCache > vm.MAX_CACHE_TTL) {
            objectsToRemove.push(cachedObject);
          }
        });

        angular.forEach(objectsToRemove, function(cachedObject) {
          vm.cache.splice(vm.cache.indexOf(cachedObject), 1);
        });
      }, 200);

      $interval(function() {
        angular.forEach(vm.cache, function(cachedObject) {
          cachedObject.lifeLeft = 1 - ((new Date() - cachedObject.addedToCache) / vm.MAX_CACHE_TTL);
        });
      }, 200);

      function loadFromStore(id) {
        var defer = $q.defer();
        $timeout(function() {
          var match;
          angular.forEach(vm.store, function(object) {
            if (object.id == id) {
              match = object;
            }
          });
          defer.resolve(angular.copy(match));
        }, vm.STORE_EXECUTION_TIME);
        return defer.promise;
      };

    }
})();
