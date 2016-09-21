function newEntityImage($http) {
    'use strict';

    return {
      restrict: 'E',
      scope: true,
      link: function(scope, elem, attrs) {

        console.log(scope);

        scope.hovered = false;
        scope.target = attrs.target;
        scope.showActions = true;
        scope.nullcontainer = false;

        if (attrs.view && attrs.view=='show') {
          scope.showActions = false;
        }

        // if(scope.entry._entityName=='adverts'&&!scope.entry.values['entityId']) {
        //   scope.nullcontainer = true;
        // }

        var target;
        if(attrs.target!='photo' && attrs.target!='advert') {
          target = attrs.target + ".image";
        } else {
          target = '';
        }

        console.log('log', scope.entry);

        // ejemplo: category_5548123d92bc492a345sf345
        var containerName = "";
        // switch (scope.entry._entityName) {
        //   case "categories":
        //     containerName = "category" + "_" + scope.entry.values['id'];;
        //     break;
        //   case "entities":
        //     containerName = "entity" + "_" + scope.entry.values['id'];
        //     break;
        //   case "adverts":
        //     containerName = "entity" + "_" + scope.entry.values['entityId'];
        //     break;
        //   case "usuarios":
        //     containerName = "usuario" + "_" + scope.entry.values['id'];
        //     break;
        // }

        if (attrs.name) {
          containerName = "entity_" + JSON.parse(localStorage.getItem('az_admin_user')).entityId;
        }

        var containerUrl = urlBase + 'containers/' + containerName;

        console.log('ASD', containerUrl)

        // existen imagenes?
        scope.images = [];
        $http.get(containerUrl + '/files/' + target)
        .success(function(files) {
          switch (files.constructor) {

            case Array:
              files.sort(function(a,b){
                return new Date(a.ctime) - new Date(b.ctime);
              });

              for(var i=0; i<files.length; i++) {
                // por cada archivo del container

                if(attrs.target==='advert') {

                  // cargo solo la imagen que corresponde a este advert
                  // if(files[i].name.indexOf(scope.entry.values['id'])!=-1) {
                  //   scope.images.push({'name':files[i].name,'src':containerUrl + '/download/' + files[i].name});
                  //   break;
                  // }
                } else {

                  if(attrs.target==='photo') {
                    if(files[i].name.indexOf('photo')!=-1) {
                      scope.images.push({'name':files[i].name,'src':containerUrl + '/download/' + files[i].name, hovered: false});
                    }
                  }
                }
              }
              break;
            case Object:
              scope.images.push({'name':files.name,'src':containerUrl + '/download/' + files.name});
              break;
          }
        });

        scope.removeImage = function(image) {
          $http.delete(containerUrl + '/files/' + image)
          .success(function(data) {
            for(var i = scope.images.length - 1; i >= 0; i--) {
              if(scope.images[i].name === image) {
                scope.images.splice(i, 1);
              }
            }
            if(target=="advert"){
              // scope.$apply(function(){
              //   scope.entry.values['banner_url'] = "";
              // });
            }
          });
        };

        scope.uploadImage = function($file) {
          if(!$file) {
            return false;
          }

          var formData = new FormData();
          formData.append('file', $file);

          var url = containerUrl + '/upload?type=' + attrs.target;
          // if(attrs.target==='advert') {
          //   url += '&advertId='+scope.entry.values['id'];
          // }

          // Para upload es necesario usar jquery ajax con FormData object
          $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success : function(res,success) {
              if(success) {
                scope.$apply(function () {
                  if(!attrs.multi) {
                    scope.images = [];
                  }
                  var new_image = {'name':res.result.files.file[0].name,'src':containerUrl + '/download/' + res.result.files.file[0].name + '?decache=' + Math.random()};
                  scope.images.push(new_image);
                  if(target=="advert"){
                    // scope.$apply(function(){
                    //   scope.entry.values['banner_url'] = new_image.src;
                    // });
                  }
                });
              }
            }
          });
        };
      },
      template:
        `<div style="display:block;">
          <div class="image-list" style="position: relative;">
            <div ng-repeat="img in images" class="image-container" style="float:left;" ng-mouseover="img.hovered = true" ng-mouseleave="img.hovered = false">
              <div class="img-actions" style="position: absolute; padding-top:10px; padding-left:10px;" ng-show="img.hovered && showActions">
                <button class="btn btn-danger-outline glyphicon glyphicon-trash" ng-click="removeImage(img.name)"></button>
              </div>
              <img class="image" ng-if="target == 'logo'" name="{{img.name}}" width="150"  height="150"ng-src="{{img.src}}"/>
              <img class="image" ng-if="target == 'cover'" name="{{img.name}}" width="100%" height="300" ng-src="{{img.src}}"/>
              <img class="image" ng-if="target == 'webcover'"name="{{img.name}}" width="100%" height="300" ng-src="{{img.src}}"/>
              <img class="image" ng-if="target == 'photo'"name="{{img.name}}" width="300" height="150" style="margin: 5px;" ng-src="{{img.src}}"/>
            </div>
          </div>

          <button
            ng-if="!nullcontainer && showActions"
            ngf-select="uploadImage($file)"
            class="btn btn-default upload glyphicon glyphicon-picture">
          </button>
          <p ng-if="nullcontainer">El anuncio debe estar creado antes de poder subir un archivo</p>
        </div>`
    };
}

newEntityImage.$inject = ['$http'];

export default newEntityImage;
