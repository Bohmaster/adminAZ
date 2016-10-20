window.addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

var urlBase = 'http://104.131.113.114:3002';
//var urlBase = '';

function hideURLbar(){
  window.scrollTo(0,1);
}

function login(e) {
  if (e) {
    e.prevenDefault();
  }

  $.ajax({
    url: urlBase + '/api/usuarios/login',
    type: 'post',
    dataType: 'json',
    data: { 'username': document.getElementById('username').value.toLowerCase(), 'password': document.getElementById('password').value },
    success: function(session) {
      $.ajax({
        // filter={"include":{"relation":"entity","fields":"subdomain"}}
        url: urlBase + '/api/usuarios/' + session.userId + "?access_token=" + session.id,
        data: {
          filter: {
            include: {
                relation: 'entity',
                scope: {
                  include:{
                      relation: 'subscription'
                  }
                }
            }
          }
        },
        type: 'get',
        success: function (user) {
          window.localStorage.setItem("az_admin_login",JSON.stringify(session));
          window.localStorage.setItem("az_admin_user",JSON.stringify(user));
          window.localStorage.setItem("az_admin_subscription",JSON.stringify(user.entity.subscription));
          window.location.href = "./index.html";
          return false;
        },
        error: function(error) {
          return false;
        }
      });
    },
    error: function(error) {
      alert("Error en user/contraseña.");
      return false;
    }
  });
}

function logout() {
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  $.ajax({
    url: urlBase + '/api/usuarios/logout',
    type: 'POST',
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", user_token);
    },
    success: function(session) {
      window.localStorage.removeItem("az_admin_login");
      window.localStorage.removeItem("az_admin_user");
      location = "./login.html";
    },
    error: function(error) {
      console.error(error);
      return false;
    }
  });
}
