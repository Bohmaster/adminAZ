function addFavoriteClient($http, $rootScope) {
    'use strict';

    return {
      restrict: 'EA',
      controller: function($scope, $location) {

        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
        var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;

        $scope.add = function() {
          $http.post(urlBase + "clients?access_token=" + user_token,
          {
            entityId: entityId,
            usuarioId: $scope.entry.values.with,
            chatroomId: $scope.entry.values.id
          }).success(function (response) {
            $http.put(urlBase + "chatrooms/" + $scope.entry.values.id + "?access_token=" + user_token,
            {
              clients: response.id
            }).success(function (data) {
              $scope.entry.values.clients = data.clients;
            })
            .error(function(data) {
              console.error(data);
            });

          })
          .error(function(data) {
            console.error(data);
          });
        };

        $scope.remove = function() {
          $http.delete(urlBase + "clients/" + $scope.entry.values.clients + "?access_token=" + user_token)
          .success(function (response) {
            $http.put(urlBase + "chatrooms/" + $scope.entry.values.id + "?access_token=" + user_token,
            {
              clients: ""
            }).success(function (data) {
              $scope.entry.values.clients = null;
            })
            .error(function(data) {
              console.error(data);
            });

          })
          .error(function(data) {
            console.error(data);
          });
        };
      },
      template:
        `<a ng-if="!entry.values.clients" class="btn btn-xs btn-info" ng-click="add(entry.values.id)" title="Agregar como cliente favorito">
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Cliente Favorito</a>
         <a ng-if="entry.values.clients" class="btn btn-xs btn-danger" ng-click="remove(entry.values.id)" title="Cancelar cliente favorito">
          <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>&nbsp;Cliente Favorito</a>`
    };
}

addFavoriteClient.$inject = ['$http', '$rootScope'];

export default addFavoriteClient;
