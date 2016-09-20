function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation == "getList" && what=="chatrooms") {
        for (var i = 0; i < data.length; i++) {
          data[i].last_activity = new Date(data[i].last_activity);
        }
        data.sort(function(a,b){
          return new Date(b.last_activity) - new Date(a.last_activity);
        });
      }
      return data;
    });
}

function httpInterceptor($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        if((config.url.indexOf('api/chatrooms')!=-1) && config.method==='DELETE') {
          var n = config.url.lastIndexOf('/') + 1;
          var url = config.url.substring(0,n) + 'hide';
          var roomId = config.url.substring(n,config.url.length);

          config.method='PUT';
          config.url = url;
          if(!config.params) config.params = [];
          config.params.id = roomId;
        }

        return config;
      }
    }
  });
}

export default { responseInterceptor, httpInterceptor }
