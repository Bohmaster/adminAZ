function imagenes($http) {
    'use strict';

    return {
      restrict: 'EA',
      controller: function($scope, $http) {
        $scope.hovered = false;
        $scope.urlBase = urlBase;

        loadImages();

        $scope.removeImage = function(imageId) {
          $http.delete(urlBase + 'containers/' + $scope.entry.values['id'] + '/files/' + imageId)
          .success(function(data) {
            console.log(data);
            loadImages();
          })
          .error(function(err) {
            console.log(err);
          });
        };

        $scope.setPortada = function(index, imageId) {
          $scope.isPortada = true;
        };

        function loadImages() {
          $http.get(urlBase + 'containers/' + $scope.entry.values['id'] + '/files')
          .success(function(files) {
            $scope.entry.values['images'] = files;
            for(var i=0; i<files.length; i++) {
              $scope.entry.values.images[i].url = urlBase + 'containers/' + $scope.entry.values.images[i].container + '/download/' + $scope.entry.values.images[i].name;
            }
          })
          .error(function(err) {
            console.error(err);
          });
        }

        $scope.$on('image.added', function(evt) {
          loadImages();
        });
      },
      template:
        `<div class="image-container" ng-repeat="img in entry.values.images" ng-mouseover="hovered = true" ng-mouseleave="hovered=false">
          <img class="image" ng-class="{cover: entry.values.cover == img.name}" ng-src="{{ img.url }}"/>
        </div>`
    };
}

imagenes.$inject = ['$http'];

export default imagenes;
