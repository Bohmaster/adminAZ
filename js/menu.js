export default function (nga, admin) {
    return nga.menu()
    .addChild(nga.menu(admin.getEntity('categories')).title('Rubros'))
    .addChild(nga.menu(admin.getEntity('entities')).title('Comercios').icon('<span class="glyphicon glyphicon-file"></span>'))
    .addChild(nga.menu(admin.getEntity('adverts')).title('Promos').icon('<span class="glyphicon glyphicon-th-large"></span>'))
    .addChild(nga.menu(admin.getEntity('tags')).title('Tags').icon('<span class="glyphicon glyphicon-tags"></span>'))
    .addChild(nga.menu(admin.getEntity('cities')).title('Ciudades').icon('<span class="glyphicon glyphicon-map-marker"></span>'))
    .addChild(nga.menu(admin.getEntity('usuarios')).title('Usuarios').icon('<span class="glyphicon glyphicon-user"></span>'))
    .addChild(nga.menu(admin.getEntity('chatrooms')).title('Mensajes').icon('<span class="glyphicon glyphicon-inbox"></span>'))
    ;
}
