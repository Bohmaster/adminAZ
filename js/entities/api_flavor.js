function requestInterceptor(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(
    function(element, operation, what, url, headers, params, httpConfig) {

      if(what=="entities") {

        if(!params.filter) {
          params['filter'] = {};
        }

        // modificar en entities backend, solo cuando se escribe (post-put)
        // y viene un campo categories.
        params.filter['include'] = ["categories","tags","subdomain","city"];

        if(operation=="put" || operation=="post") {
          // deleting non-admin related properties
          delete element.active;
          delete element.userRank;
          delete element.userLike;
          delete element.photos;
          delete element.logo;
          delete element.dummy;
          delete element.cover;
          delete element.submit;
        }
      }

      return { params: params };
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation == "get" && what=="entities") {
        data.belongsToCategory = [];
        for (var i = 0; i < data.categories.length; i++) {
          data.belongsToCategory.push(data.categories[i].id);
        }
        data.hasTags = [];
        for (var i = 0; i < data.tags.length; i++) {
          data.hasTags.push(data.tags[i].id);
        }
      }
      else if (operation == "getList" && what=="entities") {
        for (var i = 0; i < data.length; i++) {
          if(data[i].subdomain && data[i].subdomain.id) {
            data[i].hasSubdomain = true;
          }
        }
      }
      return data;
    });
}

function httpInterceptor($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        if((config.url.indexOf('api/entities')!=-1) && config.method==='GET' && config.params && config.params.filter && config.params.filter.where) {
          if (config.params.filter.where.categories) {
            config.url = config.url.replace('entities', 'categories/' + config.params.filter.where.categories + '/entities');
            delete config.params.filter.where;
          } else if (config.params.filter.where.categoryId) {
            config.url = config.url.replace('entities', 'categories/' + config.params.filter.where.categoryId + '/entities');
            delete config.params.filter.where;
          }
          else
          if (config.params.filter.where.tags) {
            config.url = config.url.replace('entities', 'tags/' + config.params.filter.where.tags + '/entities');
            delete config.params.filter.where;
          } else if (config.params.filter.where.tagId) {
            config.url = config.url.replace('entities', 'tags/' + config.params.filter.where.tagId + '/entities');
            delete config.params.filter.where;
          }
        }

        return config;
      }
    }
  });
}

export default { requestInterceptor, responseInterceptor, httpInterceptor }
