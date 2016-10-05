export default function (nga, admin) {
    return nga.menu()

    .addChild(nga.menu().link('/usuarios/edit/' + JSON.parse(localStorage.getItem('az_admin_user')).userId).title('Usuario').icon('<img src="images/usuario-01.png" width="30"></img>'))

    .addChild(nga.menu().title('Perfil').icon('<img src="images/perfil-01.png" width="30"></img>')
      .addChild(nga.menu().link('/entities/edit/' + JSON.parse(localStorage.getItem('az_admin_user')).entityId).title('General').icon(''))
      .addChild(nga.menu().link('/tags').title('Tags').icon('<span class="glyphicon glyphicon-tags"></span>'))
      .addChild(nga.menu().link('/images').title('Imagenes').icon('<span class="glyphicon glyphicon-picture"></span>'))
      .addChild(nga.menu().link('/hours').title('Información comercial').icon('<span class="glyphicon glyphicon-picture"></span>'))
      .addChild(nga.menu().link('/basica').title('Información básica').icon('<span class="glyphicon glyphicon-picture"></span>'))
    )

    .addChild(nga.menu().link('/adverts/list').title('Publicaciones').icon('<img src="images/publicaciones-01.png" width="35"></img>'))
    .addChild(nga.menu().link('/products/list').title('Productos').icon('<img src="images/productos-01.png" width="35"></img>'))
    .addChild(nga.menu(admin.getEntity('chatrooms')).title('Mensajes').icon('<img src="images/mensajes-01.png" width="30"></img>'))
    .addChild(nga.menu(admin.getEntity('clients')).title('Clientes favoritos').icon('<img src="images/clientesfav-01.png" width="30"></img>'))
    .addChild(nga.menu().link('/tutoriales').title('Tutoriales').icon('<img src="images/tutoriales-01.png" width="35"></img>'))
    ;
}
