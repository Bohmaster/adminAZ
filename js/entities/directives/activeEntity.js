function activeEntity($http) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        entry: "&"
      },
      link: function(scope, elem, attrs) {

        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        scope.entidad = scope.entry().values;
        scope.activeEntity = function() {
          $http.post(urlBase + 'entities/activation?access_token=' + user_token, { entityId: scope.entidad.id, activate: true })
          .success(function (data) {
            scope.entidad.active = true;
          })
          .error(function(err) {
            console.error(err);
          });
        }
      },
      template:
      `<a class="btn btn-success btn-xs" ng-click="activeEntity()" ng-disabled="!entidad.hasSubdomain" >
        <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp;Activar
      </a>`
    };
}

activeEntity.$inject = ['$http'];

export default activeEntity;
