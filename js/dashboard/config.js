var moment = require('moment');
var fromNow = v => moment(v).fromNow();

export default function (nga, admin) {

    return nga.dashboard()
        .addCollection(nga.collection(admin.getEntity('chatrooms'))
                .name('ultimos_mensajes')
                .title('Últimos mensajes')
                //.permanentFilters({ date: { gte: moment().substract(1, 'months').toDate() } })
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
                .sortField('last_activity')
                .sortDir('DESC')
                .permanentFilters({
                  include: 'users'
                })
                .perPage(10)
        );


}
