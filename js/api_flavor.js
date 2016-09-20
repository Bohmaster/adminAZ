function requestInterceptor(RestangularProvider) {
    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {

      if (operation == 'getList') {

        // Mapeando a API Loopback flavor
        params.filter = {};

        // where
        if(params._filters) {

          // Los modelos tienen que agregar los include en los permanentFilters

          // guardo los include
          var include = null;
          if(params._filters.include) {
            include = params._filters.include;
            delete params._filters.include;
          }

          // primero limpio los filtros
          var _filters = {};
          for (var filter in params._filters) {
            if(params._filters[filter]) {
              _filters[filter] = params._filters[filter];
            }
          }

          // ahora armo el string que voy a usar en el where REST
          var filterString = "";

          // si tengo más de un filtro agrego la adicion
          var paramsCount = Object.keys(_filters).length;
          if(paramsCount > 1) {
            filterString = '{"and":[';
          }

          // ahora si contruyendo el objeto where, primero en un String
          var index = 0;
          for (var filter in _filters) {

            // esta linea es la parte más harcodeada de todo el admin
            if(filter=='name' || filter=='title' || filter=='description' || filter=='address') {
              // para campos strings tengo que usar 'like'
              filterString += '{"' + filter + '": { "like":"' + _filters[filter] + '", "options": "i" } }';
            } else {
              if(_filters[filter] === Object(_filters[filter])) {
                // el filtro puede ser un objeto, como en el caso de cuando chequeamos si un campo existe o no en un modelo
                filterString += '{"' + filter + '":' + JSON.stringify(_filters[filter]) + '}';
              } else {
                filterString += '{"' + filter + '":"' + _filters[filter] + '"}';
              }
            }

            if(index!=paramsCount-1) {
              filterString += ",";
            }

            index++;
          }

          if(paramsCount > 1) {
            filterString += ']}';
          }

          // terminando, si había filtros, convierto el String a JSON y lo agrego al params
          if(filterString.length) {
            params.filter['where'] = JSON.parse(filterString);
          }

          // Agrego los include
          if (include) {
            params.filter['include'] = include;
          }

          delete params._filters;
        }

        // Paginación
        if (params._page) {
          var limit = params._perPage;
          var offset = (params._page - 1) * params._perPage;
          params.filter['limit'] = limit.toString();
          params.filter['offset'] = offset.toString();
          delete params._page;
          delete params._perPage;
        }

        // Orden
        if (params._sortField) {
          params.filter['order'] = params._sortField + (params._sortDir?params._sortDir:'');
          delete params._sortField;
          delete params._sortDir;
        }

        // if (headers['Content-Range']) {
        //     headers['X-Total-Count'] = headers['Content-Range'].split('/').pop();
        // }
      }

      return { params: params, headers: headers };

    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation == "getList") {
            var contentRange = response.headers('Content-Range');
            if(contentRange) {
              response.totalCount = contentRange.split('/')[1];
            } else {
              response.totalCount = 0;
            }
        }
        return data;
    });
}

export default { requestInterceptor, responseInterceptor }
