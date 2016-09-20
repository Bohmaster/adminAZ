export default function (nga, admin) {

  var Clients = admin.getEntity('clients');

  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;

  Clients.listView()
    .permanentFilters({
      entityId: entityId,
      include: 'usuario'
    })
    .fields([
      nga.field('usuario').label('Nombre')
      .map(function(value,entry){
        var name = '';
        if(entry['usuario.name'] && entry['usuario.name']!='') {
          name = entry['usuario.name'];
        } else if(entry['usuario.username'] && entry['usuario.username']!='') {
          name = entry['usuario.username'];
        } else {
          name = entry['usuario.email'];
        }
        return name;
      }),
      nga.field('since','date').label('Desde el día').format('dd/MM/yyyy'),

      nga.field('chatroomId', 'template').label('Mandar Mensaje')
      .template('<a class="btn btn-default btn-xs" value="{{value}}" href="#/rooms/{{value}}/chat"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Escribir</a>')

    ])
    .listActions(['<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'])
    .actions(['batch'])
    .title('Clientes Favoritos');

    Clients.deletionView()
    .actions(['<ma-list-button entry="entry" entity="entity" label="Volver"></ma-list-button>'])
    .title('Borrar cliente favorito? {{ entry.values.usuario.name }}');

  return Clients;

}
