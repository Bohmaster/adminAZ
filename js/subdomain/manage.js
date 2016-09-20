function manage($http) {
    'use strict';

    return {
      restrict: 'E',
      controller: function($scope, $http) {

        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        $scope.subdomainChanged = false;

        var getSubdomain = function() {
          if($scope.entry.values.subdomain) {
            $scope.hasSubdomain = true;
            $scope.subdomain = $scope.entry.values.subdomain.name;
          }
        };

        $scope.addSubdomain = function() {

          $http.post(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token, {
            name: $scope.subdomain
          })
          .success(function (data) { ; })
          .error(function(data) {
            window.alert(data.error.details.messages.name[0]);
            $scope.subdomain = "";
          });
        };

        $scope.editSubdomain = function() {

          $http.put(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token, {
            name: $scope.subdomain
          })
          .success(function (data) { ; })
          .error(function(data) {
            window.alert(data.error.details.messages.name[0]);
          });
        };

        getSubdomain();

      },
      template:
        `<input type="text" name="subdomain" ng-model="subdomain" ng-change="subdomainChanged=true;"/>
          <button class="btn btn-default" ng-show="!hasSubdomain" ng-click="addSubdomain()" ng-disabled="!subdomainChanged">Agregar</button>
          <button class="btn btn-default" ng-show="hasSubdomain" ng-click="editSubdomain()" ng-disabled="!subdomainChanged">Editar</button>
          <h5>El subdominio debe ser único e irrepetible.</h5>`
    };
}

manage.$inject = ['$http'];

export default manage;
