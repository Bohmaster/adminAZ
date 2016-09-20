function viewMessages($http, $rootScope) {
    'use strict';

    return {
      restrict: 'EA',
      controller: function($scope, $location) {

        var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        $scope.entry.values.unread = $scope.entry.values.unread && ($scope.entry.values.last_message_by!=userId);

        $scope.goTo = function(roomId) {
          if( $scope.entry.values.unread) {
            $http.put(urlBase + "chatrooms/" + roomId + '?access_token=' + user_token, { unread: false })
            .success(function (data) {
              var index = $rootScope.unreadRooms.indexOf(roomId);
              if (index > -1) {
                $rootScope.unreadRooms.splice(index, 1);
              }
              location = 'index.html#/rooms/' + roomId + '/chat';
            })
            .error(function(data) {
              console.error(data);
            });
          } else {
            location = 'index.html#/rooms/' + roomId + '/chat';
          }
        };
      },
      template:
      `<a class="btn btn-xs" ng-class="{ \'btn-success\': entry.values.unread }" ng-click="goTo(entry.values.id)">
        <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp;Ver mensajes
      </a>`
    };
}

viewMessages.$inject = ['$http', '$rootScope'];

export default viewMessages;
