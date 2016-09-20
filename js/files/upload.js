function upload($http, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {

        scope.uploadThis = function($file) {
          if(!$file) {
            return false;
          }
          
          var formData = new FormData();
          formData.append('file', $file);
          $.ajax({
            url: urlBase + 'containers/' + scope.entry.values['id'] + '/upload?is=cover',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success : function(data) {
              $rootScope.$broadcast('image.added');
            }
          });
        };
      },
      template:
        `<div class="row">
          <div class="col-md-2">
            <button class="" ngf-select="uploadThis($file)" ngf-multiple="true">Subir imagen</button>
          </div>
        </div>`
    };
}

upload.$inject = ['$http', '$rootScope'];

export default upload;
