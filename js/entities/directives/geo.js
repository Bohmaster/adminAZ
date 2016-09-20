function geo($http) {
    'use strict';

    return {
      restrict: 'EA',
      controller: function($scope, $http) {

        // <div id="map"></div> ng-show="entry.values.geopoint"
        // var map = new google.maps.Map(document.getElementById('map'), {
        //   zoom: 8,
        //   center: {lat: -34.397, lng: 150.644}
        // });

        var API_KEY = "AIzaSyAMdV-HX0rtJd1njvA714X8mE1-ge--9EI";
        var geocoder = new google.maps.Geocoder();

        if ($scope.entry.values['geopoint.lat']!='' && $scope.entry.values['geopoint.lng']!='') {
          $scope.resultado = 'Posee Geolocalización ['+ $scope.entry.values['geopoint.lat'] + ',' + $scope.entry.values['geopoint.lng'] + ']';
        } else {
          $scope.resultado = 'No ha sido geolocalizado aún.';
        }

        $scope.geoLocate = function() {

          $scope.resultado = 'Buscando...';

          var address = "";

          if($scope.entry._entityName=="cities") {

            address = $scope.entry.values.name + "," + $scope.form.stateId.$viewValue.label;

            geocoder.geocode({'address': address}, function(results, status) {

              if (status===google.maps.GeocoderStatus.OK) {

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                $scope.entry.values['geopoint'] = {
                  lat: lat, lng: lng
                };

                $scope.$apply(function(){
                  $scope.resultado = "Geolocalización encontrada! " + address + ": [" + lat + "," + lng + "] - Presione guardar para mantener los cambios.";
                });

              } else {
                $scope.$apply(function(){
                  $scope.resultado = "Geolocalización no encontrada.";
                });
              }});

            } else if($scope.entry._entityName=="entities") {

              address = $scope.entry.values['address'],
              city = $scope.entry.values['city.name'],
              state = null;

              $http.get(urlBase + 'states/' + $scope.entry.values['city.stateId'])
              .success(function(state) {

                var fullAddress = address + ', ' + city + ', ' + state.name;

                geocoder.geocode({'address': fullAddress}, function(results, status) {

                  if (status == google.maps.GeocoderStatus.OK && results.length==1 && results[0].types[0]=="street_address") {

                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();

                    $scope.entry.values['geopoint'] = {
                      lat: lat,
                      lng: lng
                    };

                    $scope.$apply(function(){
                      $scope.resultado = "Geolocalización encontrada! " + fullAddress + ": [" + lat + "," + lng + "] - Presione guardar para mantener los cambios.";
                      // $("#submitForm").click();
                    });

                  } else {
                    $scope.$apply(function(){
                      $scope.resultado = "Geolocalización no encontrada, por favor chequee la dirección ingresada!";
                    });
                  }});
                })
                .error(function(err) {
                  geocoder.geocode({'address': address + ',' + city}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      var lat = results[0].geometry.location.lat();
                      var lng = results[0].geometry.location.lng();

                      $scope.entry.values['geopoint'] = {
                        lat: lat,
                        lng: lng
                      };

                      $scope.$apply(function(){
                        $scope.resultado = lat + "," + lng;
                      });

                    } else {

                      $scope.$apply(function(){
                        $scope.resultado = "No encontrado... :(";
                      });

                    }});
                  });

                }
              }
            },
            template:
              `<button type="button" class="btn button-success" ng-click="geoLocate()" class="btn btn-default">Buscar</button><p style="padding:10px;font-style:italic;">{{resultado}}</p>`
          };
}

geo.$inject = ['$http'];

export default geo;
