function addNewTag($http, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        entry: "&",
        datastore: "&"
      },
      link: function(scope, elem, attrs) {

        scope.tagName="";
        scope.isValid = true;

        var RegExpression = /^[a-zA-Z\s]{3,20}$/;

        scope.valid = function() {
          scope.isValid = RegExpression.test(scope.tagName);
        };

        var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        // aca buscar los arrays de scope.datastore() que tienen la palabra tags, y agregarle la nueva tag
        //
        // var newChoice = scope.datastore()._entries.tags_2_choices[0];
        // newChoice._identifierValue = tag.id;
        // newChoice.values.id = tag.id;
        // newChoice.values.name = tag.name;
        // newChoice.values.description = tag.description;
        // newChoice.values.ownerId = tag.ownerId;
        // scope.datastore()._entries.tags_2_choices.push(newChoice);
        // scope.datastore()._entries.tags_2_values.push(newChoice);

        console.log('voy a agregar esto!');
        console.log(scope.datastore());

        var modelChoice=null;
        for (var key in scope.datastore()._entries) {
          console.log(key);
          if (key.includes("tags") && key.includes("choices")) {
            modelChoice = scope.datastore()._entries[key][0];
            modelChoice._identifierValue = '999';
            modelChoice.values.id = '999';
            modelChoice.values.name = '999';
            modelChoice.values.description = '999';
            modelChoice.values.ownerId = '999';

            console.log('agregando',modelChoice);
          }

          if (modelChoice!=null && key.includes("tags")) {
            console.log('y ahora aca a');
            scope.datastore()._entries[key].push(modelChoice);
            console.log('a',key);
            console.log(scope.datastore()._entries[key]);
          } else {
            console.log('modelChoice es null para',key);
          }
        }

        console.log('llamando a update');
        $rootScope.$broadcast('choices:update');

        scope.addTag = function() {

          if(!scope.tagName.length) return;

          $http.post(urlBase + 'tags?access_token=' + user_token, { name: scope.tagName, ownerId: userId})
          .success(function (tag) {
            console.log(tag);

            $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + scope.entry().values.id + '?access_token=' + user_token)
            .success(function (rel) {
              scope.entry().values.tags.push(tag);
              scope.entry().values.hasTags.push(tag.id);
              scope.tagName = '';

              $http.get(urlBase + 'tags?access_token=' + user_token)
              .success(function(tags) {
                var initialChoices = [];
                for (var i = 0; i < tags.length; i++) {
                  if(scope.entry().values.hasTags.indexOf(tags[i].id)==-1) {
                    initialChoices.push( { value: tags[i].id, label: tags[i].name } );
                  }
                }

                initialChoices.push( { value: tag.id, label: tag.name } );
                $rootScope.$broadcast('choices:update', { choices: initialChoices });

                var newChoice = scope.datastore()._entries.tags_2_choices[0];
                newChoice._identifierValue = tag.id;
                newChoice.values.id = tag.id;
                newChoice.values.name = tag.name;
                newChoice.values.description = tag.description;
                newChoice.values.ownerId = tag.ownerId;
                scope.datastore()._entries.tags_2_choices.push(newChoice);
                scope.datastore()._entries.tags_2_values.push(newChoice);

              })
              .error(function(err) {
                console.error(err);
              });

            })
            .error(function(err) {
              console.error(err);
            });

          })
          .error(function(err) {
            console.error(err);
          });
        }
      },
      template:
      `<div class="row">
        <div class="col-md-12 pull-right">
          <div class="input-group" ng-class="{\'has-error\': !isValid }">
            <span class="input-group-addon">Agregar nueva Tag</span>
            <input type="text" class="form-control" name="tag" placeholder="Sólo letras y espacios, de 3 a 20 caracteres" ng-model="tagName" ng-change="valid()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="addTag();" ng-disabled="!tagName || !isValid"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
            </span>
          </div>
        </div>
      </div>`,
    };
}

addNewTag.$inject = ['$http','$rootScope'];

export default addNewTag;
