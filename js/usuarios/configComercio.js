export default function (nga, admin) {

  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;

  // Los datos de este user para que cambie su información como usuario en el sistema
  var Usuario = admin.getEntity('usuarios').url(function(entityName, viewType, identifierValue, identifierName) {
    return 'usuarios/' + userId;
  });

  Usuario.editionView().fields([
    nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'),
    nga.field('name', 'text').label('Nombre'),
    nga.field('email', 'text').label('Email'),
    nga.field('password', 'text').label('Contraseña')
  ])
  .actions([])
  .title('Información de tu Usuario AZ');

  return Usuario;

}
