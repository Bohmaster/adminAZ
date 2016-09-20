function publishFacebook($http, $rootScope) {
    'use strict';

    return {
      restrict: 'EA',
      controller: function($scope, $location) {

        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        $scope.cantPublish = ($scope.entry.values.facebookPostId || !$scope.entry.values['city.facebook_page_id'] || !$scope.entry.values['city.facebook_page_token']);

        if($scope.entry.values.facebookPostId) {
          $scope.state = 'Publicado';
          $scope.title = 'Fue publicado en Facebook';
        } else {
          $scope.state = 'Publicar';
          $scope.title = 'Publicar a Facebook';
        }

        $scope.publish = function() {

          $http.post(urlBase + "adverts/postfb?access_token=" + user_token,
          {
            id: $scope.entry.values.id
          }).success(function (response) {
            var postid = (response.result.post_id)?response.result.post_id:response.result.id;
            $scope.entry.values.facebookPostId = postid;
          })
          .error(function(data) {
            console.error(data);
          });
        };
      },
      template:
        `<button ng-if="!entry.values.facebookPostId" ng-disabled="cantPublish" class="btn btn-xs btn-primary" ng-click="publish()" title="{{title}}">
          <i class="fa fa-facebook" aria-hidden="true"></i>&nbsp;{{state}}</button>
          <a ng-if="entry.values.facebookPostId" target="_blank" ng-href="https://www.facebook.com/{{entry.values.facebookPostId}}">Publicado</a>`
    };
}

publishFacebook.$inject = ['$http', '$rootScope'];

export default publishFacebook;
