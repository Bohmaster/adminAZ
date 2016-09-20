export default function (nga, admin) {

  var Chatrooms = admin.getEntity('chatrooms');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;

  Chatrooms.listView()
  .url(function() {
    return 'usuarios/' + userId + "/chatrooms";
  })
  .actions([])
  .sortField("last_activity")
  .fields([
    nga.field('users', 'template')
    .label('Desde user')
    .template('<user></user>'),

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
  .listActions(['<messages></messages>','<ma-delete-button entry="entry" entity="entity" entity-name="chatrooms" label="Ocultar chat" size="xs"></ma-delete-button>','<add-client></add-client>'])
  .title('Conversaciones');

  Chatrooms.deletionView()
  .fields(
    nga.field('name').label('Chat')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('¿Estás seguro de continuar?')
  .description('Ésta acción eliminará el chat completo con todos sus mensajes, para vos y para el usuario con el que estás conversando (los usuarios de la aplicación sólamente pueden ver los mensajes de chat. Las sugerencias de locales permanecerán ocultas para ellos).');

  return Chatrooms;

}
