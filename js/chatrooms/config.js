export default function (nga, admin) {

  var Chatrooms = admin.getEntity('chatrooms');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;

  Chatrooms.listView()
  .url(function() {
    return 'usuarios/' + userId + "/chatrooms";
  })
  .permanentFilters({
    include: 'users'
  })
  .actions([])
  .sortField("last_activity")
  // .permanentFilters({ hide: false })
  .fields([
    nga.field('users', 'template')
    .label('Desde user')
    .template('<roommate></roommate>'),

    nga.field('hide', 'template')
    .label('Ocultar')
    .template('<ma-delete-button entry="entry" entity="entity" entity-name="chatrooms" label="Ocultar" size="xs"></ma-delete-button>'),

    nga.field('type')
      .label('Tipo')
      .map(function(value){
        return (value='suggestion')?'Sugerencia':'Mensaje';
      }),

    nga.field('last_activity', 'date')
      .label('Ultima actividad')
      .map(function(value){
        return moment(value).format('D [del] M [de] YYYY, h:mm a');
      })
  ])
  // ,'<hide-room></hide-room>'
  .listActions(['<messages></messages>'])
  .title('Conversaciones');

  Chatrooms.deletionView().fields(
    nga.field('name').label('Chat')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('¿Ocultar estos mensajes?')
  .description('Los mensajes volveran a ser visibles cuando vuelvan a tener actividad.');

  return Chatrooms;

}
