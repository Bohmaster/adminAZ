export default function (nga, admin) {

  var Adverts = admin.getEntity('adverts');
  var Entities = admin.getEntity('entities');

  Adverts.listView()
  .fields([
    nga.field('title').isDetailLink(true).detailLinkRoute("show").label('Título'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('creation_date','date').label('Creado el día'),
    nga.field('entityId', 'reference')
      .targetEntity(Entities)
      .targetField(nga.field('name'))
      .label('Entidad'),
    nga.field('facebook', 'template')
      .label('Facebook')
      .template('<publish-facebook></publish-facebook>')
  ])
  .filters([

    nga.field('entityId', 'reference')
    .label('Negocio')
    .perPage(100000)
    .pinned(true)
    .targetEntity(Entities)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Filtrar' }),

    nga.field('title', 'template')
    .label('Título')
    .pinned(true)
    .template('<search placeholder="filtrar"></search>'),

    nga.field('description', 'template')
    .label('Descripción')
    .pinned(true)
    .template('<search placeholder="filtrar"></search>')
  ])
  .actions(['batch','<ma-create-button entity="::entity" label="Nueva"></ma-create-button>'])
  .listActions([
    '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
    '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ])
  .title('Promociones');

  Adverts.creationView()
  .fields([
    nga.field('entityId', 'reference')
    .perPage(10000)
    .label('Entidad')
    .targetEntity(Entities)
    .targetField(nga.field('name'))
    .attributes({ placeholder: "Tipear nombre para filtrar" }),

    nga.field('banner', 'choice')
    .choices([
      { value: false, label: 'Texto' },
      { value: true, label: 'Banner' }
    ])
    .defaultValue(false)
    .attributes({ placeholder: 'Tipo' })
    .validation({required: true})
    .label('Tipo de Promoción'),

    nga.field('cover', 'template')
    .label('Banner')
    .template('<entity-image target="advert"></entity-image>'),

    nga.field('title').label('Título').validation({required: true}),
    nga.field('subtitle', 'text').label('Subtítulo'),
    nga.field('description', 'text').label('Descripción').validation({required: true}),
    nga.field('date_description', 'text').label('Descripción de fecha')
  ]).title('Promociones');

  Adverts.editionView()
  .fields([

    nga.field('entityId', 'reference')
    .perPage(10000)
    .label('Entidad')
    .targetEntity(Entities)
    .targetField(nga.field('name'))
    .attributes({ placeholder: "Tipear nombre para filtrar" }),

    nga.field('banner', 'choice')
    .defaultValue(false)
    .attributes({ placeholder: 'Tipo' })
    .choices([
      { value: false, label: 'Texto' },
      { value: true, label: 'Banner' }
    ]).label('Tipo de Promoción'),

    nga.field('cover', 'template')
    .label('Banner')
    .template('<entity-image target="advert"></entity-image>'),

    nga.field('title').label('Título'),
    nga.field('subtitle', 'text').label('Subtítulo'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('date_description', 'text').label('Descripción de fecha')

  ])
  .title('Editar Promoción')
  .actions([
    '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
    '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ]);

  Adverts.showView().fields([
    nga.field('banner').label('Tipo de Promoción')
    .map(function(value){
      return (value)?'Banner':'Texto';
    }),

    nga.field('cover', 'template')
    .label('Imagen')
    .template('<entity-image target="advert" view="show"></entity-image>'),

    nga.field('title').label('Título'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('creation_date','date').label('Creado el día').format('dd/MM/yyyy'),
    nga.field('entityId', 'reference')
    .targetEntity(Entities)
    .targetField(nga.field('name'))
    .isDetailLink(true)
    .detailLinkRoute('edit')
    .label('Entidad'),

    // nga.field('facebookPostId', 'template').label('Facebook')
    // .template('<publish-facebook ng-if="!value"></publish-facebook><a ng-if="value" ng-href="https://www.facebook.com/{{value}}" target="_blank">https://www.facebook.com/{{value}}</a>')

    nga.field('facebookPostId', 'template').label('Facebook')
    .template('<publish-facebook></publish-facebook>')

  ]).title('Promociones');

  Adverts.deletionView().fields(
    nga.field('title').label('Titulo')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('Borrar Promocion "{{ entry.values.title }}"');

  return Adverts;

}
