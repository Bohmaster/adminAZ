function filelistBind($http, $rootScope) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, elm, attrs ) {
        console.log("directiva!!");
          elm.bind('change', function( evt ) {
            scope.$apply(function() {
              scope[ attrs.name ] = evt.target.files;
              scope.imgAvailable=true;
              //renderImage(evt.target.files[0]);
              // generate a new FileReader object
              var reader = new FileReader();
              // inject an image with the src url
              reader.onload = function(event) {
                scope.$apply(function() {
                  scope.the_url = event.target.result
                });
              };
              // when the file is read it triggers the onload event above.
              reader.readAsDataURL(evt.target.files[0]);
            });
          });
        }
    };
}

filelistBind.$inject = ['$http', '$rootScope'];

export default filelistBind;
