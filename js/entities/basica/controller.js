export default ['$scope', '$http', function($scope, $http) {

  // $scope.availableTags = [];

  var urlBase = localStorage.getItem('az_admin_api');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  function activate() {
    // loadTags();
    console.log('hello you!');
  }


  var markerId = 0;

  $scope.create = function(latitude, longitude) {
        var marker = {
          coords:{
            latitude: latitude,
            longitude: longitude
          },
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel' //clase css
            },
            id: ++markerId
        };
        return marker;
    }

    $scope.invokeSuccessCallback = function(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    $scope.createByCoords = function(latitude, longitude, successCallback) {
        var marker = $scope.create(latitude, longitude);
        $scope.invokeSuccessCallback(successCallback, marker);
    }

    $scope.createByAddress = function(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = $scope.create(latitude, longitude);
                $scope.invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    $scope.createByCurrentLocation = function(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = $scope.create(position.coords.latitude, position.coords.longitude);
                $scope.invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    $scope.createByCoords(-33.333333, -60.216667, function (marker) {
      marker.options.labelContent = 'AzClub';
      $scope.azMarker = marker;
    });

    $scope.address = '';
    $scope.autocomplete = function() {
      var input = document.getElementById('searchBox');
      var autocomplete = new google.maps.places.Autocomplete(input);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
              var dir = autocomplete.getPlace();
              //console.log(dir.formatted_address);
              $scope.address = dir.formatted_address;
          });
    }

    $scope.autocomplete();


    $scope.map = {
          center: {
              latitude: -33.333333,
              longitude: -60.216667
          },
          zoom: 17,
          markers: [],
          control: {},
          options: {
              scrollwheel: true
          }
      };

      $scope.map.markers.push($scope.azMarker);

      $scope.addCurrentLocation = function () {
        $scope.map.markers.length = 0;
              $scope.createByCurrentLocation(function (marker) {
                  marker.options.labelContent = 'Usted está aquí';
                  $scope.map.markers.push(marker);
                  $scope.refresh(marker.coords);
                  console.log(marker.coords + "coords");
              });
      };


      $scope.addAddress = function() {
            $scope.map.markers.length = 0;
              var address = $scope.address;
              console.log(address);
              if (address !== '') {
                  $scope.createByAddress(address, function(marker) {
                      $scope.map.markers.push(marker);
                      $scope.refresh(marker.coords);
                  });
              }
              else {
                alert("Escriba una direccion vállida")
              }
      };

      $scope.refresh = function(coords) {
          $scope.map.control.refresh({latitude: coords.latitude,
              longitude: coords.longitude});
      }




  // function loadTags() {
  //   $http.get(
  //     urlBase + 'tags?access_token=' + user_token
  //   ).success(function(tags) {
  //     $scope.availableTags = tags;
  //   }).error(function(err) {
  //     console.error(err);
  //   });
  // }
  //
  // $scope.agregarTag = function(name) {
  //
  //   $http.post(urlBase + 'tags?access_token=' + user_token, { name: name, ownerId: userId})
  //   .success(function (tag) {
  //     $scope.availableTags.push(tag);
  //
  //     $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + entityId + '?access_token=' + user_token)
  //       .success(function (rel) {
  //         // agregar a la lista de tags de esta entidad
  //
  //       }).error(function(err) {
  //         console.error(err);
  //       });
  //
  //     }).error(function(err) {
  //       console.error(err);
  //     }
  //   );
  // }

  activate();

}]
